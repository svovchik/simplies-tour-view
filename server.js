const express = require('express');
const apiRouter = require('./api/routes/tour.route');

const PORT = 8080;
const app = express();

app.use(express.json());

app.use('/tours', express.static('tours'));
app.use('/api/tours', apiRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}...`);
});
