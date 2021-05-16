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
