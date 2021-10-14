const express = require('express');
const apiTourRouter = require('./api/routes/tour.route');
const apiUserRouter = require('./api/routes/user.route');

const PORT = 4000;
const app = express();

app.use(express.json());

app.use('/tours', express.static('tours'));
app.use('/api/tours', apiTourRouter);
app.use('/api/users', apiUserRouter);

app.get('/', (req, res) => {
  res.send('dev.VERO.digital');
});

app.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}...`);
});
