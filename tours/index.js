Vue.component('nav-bar', {
  template: `
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand">Kaap Tours</a>
      <div class="d-flex">
        <button v-if="!user" class="btn btn-outline-light btn-sm" type="button">Login</button>
        <button v-else class="btn btn-outline-light btn-sm" type="button">Add Project</button>
      </div>
    </div>
  </nav>
  `,
  data() {
    return {
      user: null
    }
  }
});

const app = new Vue({
  el: '#app',
  data: {
    tours: null
  },
  methods: {
    capitalise: function (string) {
      return string
        .split('_')
        .map(word => word[0].toUpperCase() + word.toLowerCase().slice(1))
        .join(' ');
    }
  },
  created() {
    fetch('../api/tours/')
      .then(response => response.json())
      .then(response => {
        this.tours = response.projects;
      });
  }
});