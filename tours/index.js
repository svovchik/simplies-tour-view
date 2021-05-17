Vue.component('nav-bar', {
  template: `
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand">Kaap Tours</a>
      <div class="d-flex">
        <button
          v-if="!authorized"
          class="btn btn-outline-light btn-sm"
          type="button"
          @click.prevent="login"
        >
          Login
        </button>
        <button
          v-else
          class="btn btn-outline-light btn-sm"
          type="button"
          @click.prevent="logout"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
  `,
  props: ['authorized'],
  data() {
    return {};
  },
  methods: {
    login() {
      this.$emit('login');
    },
    logout() {
      this.$emit('logout');
    }
  }
}); // nav-bar

// -------------- Login Window
Vue.component('login-modal', {
  template: `
    <div
      class="modal fade show"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      style="display: block;"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Login Page</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="login" class="form-label">Login:</label>
                <input type="text" class="form-control" id="login" placeholder="username" v-model="username">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" class="form-control" id="password" placeholder="password" v-model="password">
              </div>
              <p class="text-danger">{{ notification }}</p>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="close">Close</button>
            <button type="button" class="btn btn-primary" @click="login">Login</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      username: '',
      password: '',
      notification: ''
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    login() {
      const user = {
        username: this.username,
        password: this.password
      };
      fetch('../api/users/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error(`Error ${response.status}: User not found`);
          }
        })
        .then(response => {
          this.$emit('login', response);
        })
        .catch(error => {
          this.notification = error.message;
        });
    }
  }
}); // login-modal

// -------------- Edit Project Window
Vue.component('edit-modal', {
  template: `
    <div
      class="modal fade show"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      style="display: block;"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ 'Edit tour: ' + tour.name }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
          </div>

          <div class="modal-body">
            <form v-if="tour" enctype="multipart/form-data">
              <div v-if="createMode" class="mb-3">
                <label for="projectName" class="form-label">Project Name:</label>
                <input 
                  type="text" 
                  id="projectName" 
                  class="form-control" 
                  placeholder="project name"
                  v-model="project.name"
                >
              </div>

              <div class="mb-3">
                <label for="previewPath" class="form-label">Preview Image Path:</label>
                <input 
                  type="text" 
                  id="previewPath" 
                  class="form-control" 
                  placeholder="image/preview/path"
                  v-model="project.preview"
                >
              </div>

              <div class="mb-3">
                <label for="description" class="form-label">Project Description:</label>
                <textarea class="form-control" id="description" rows="3" v-model="project.description"></textarea>
              </div>

              <div class="mb-3">
                <label for="file" class="form-label">Select Tour Archive to update content:</label>
                <input 
                  class="form-control"  
                  ref="filedata"
                  name="filedata" 
                  type="file" 
                  id="filedata" 
                  accept="application/zip"
                  @change="handleFileUpload"
                />
              </div>

              <p class="text-danger">{{ notification }}</p>
            </form>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="close">Close</button>
            <button type="button" class="btn btn-primary" @click="send">Update</button>
          </div>
        </div>
      </div>
    </div>
  `,
  props: ['tour', 'user'],
  data() {
    return {
      project: null,
      createMode: false,
      file: '',
      notification: '' //`Error: Can't find index.html inside archive file.`
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    handleFileUpload() {
      this.file = this.$refs.filedata.files[0];
    },
    async send() {
      if (!this.project.name) {
        this.notification = 'Enter project name!';
        return;
      }
      this.project.name = this.project.name
        .trim()
        .split(' ')
        .filter(word => !!word)
        .join('_')
        .toLowerCase();

      try {
        const response = await fetch(`../api/tours/${this.project.name}`, {
          method: 'POST',
          headers: {
            Authorization: this.user.accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.project)
        });

        if (response.status === 401 || response.status === 403) {
          this.$emit('error');
        } else if (response.status !== 200 && response.status !== 201) {
          const message = await response.json();
          throw new Error(message);
        }

        if (this.file !== '') {
          const formData = new FormData();
          formData.append('filedata', this.$refs.filedata.files[0]);
          console.log(formData);

          await fetch(`../api/tours/${this.project.name}/upload`, {
            method: 'POST',
            body: formData
          });
        }

        this.$emit('close');
      } catch (error) {
        this.notification = error.message;
      }
    }
  },
  created() {
    if (!this.tour.name) {
      this.project = {};
      this.createMode = true;
    } else {
      this.project = this.tour;
    }
  }
}); // edit-modal

// -------------- Main Application
const app = new Vue({
  el: '#app',
  data: {
    modal: 'none',
    edit: null,
    tours: null,
    user: null
  },
  methods: {
    capitalise: function (string) {
      return string
        .split('_')
        .map(word => word[0].toUpperCase() + word.toLowerCase().slice(1))
        .join(' ');
    },
    openLoginWindow() {
      this.modal = 'login';
    },
    login(user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.closeModal();
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
      this.closeModal();
    },
    openEditWindow(name) {
      if (name) {
        fetch(`../api/tours/${name}`, {
          headers: { Authorization: this.user.accessToken }
        })
          .then(response => {
            if (response.status === 200) {
              return response.json();
            } else if (response.status === 401 || response.status === 403) {
              this.logout();
              throw new Error('Authorization error.');
            }
          })
          .then(response => {
            if (response) {
              this.edit = response;
              this.modal = 'edit';
            }
          })
          .catch(error => {
            console.warn(error.message);
          });
      } else {
        this.edit = {};
        this.modal = 'edit';
      }
    },
    closeModal() {
      this.modal = 'none';
      this.edit = null;
      this.fetchTours();
    },
    async removeTour(name) {
      if (confirm(`Do you want to remove tour: ${this.capitalise(name)}?`)) {
        try {
          const response = await fetch(`../api/tours/${name}`, {
            method: 'DELETE',
            headers: { Authorization: this.user.accessToken }
          });
        } catch (error) {
          console.warn(error.message);
        }
      }
      this.fetchTours();
    },
    fetchTours() {
      fetch('../api/tours/')
        .then(response => response.json())
        .then(response => {
          this.tours = response.projects;
        });
    }
  },
  computed: {
    authorized() {
      return !!this.user;
    }
  },
  created() {
    this.fetchTours();
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }
});
