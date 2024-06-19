const Controller = require('./controllers/Controller.js');
const GooglePlaces = require('./sevices/GooglePlaces.js');
const Location = require('./sevices/Location.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

let L = new Location();
let GP = new GooglePlaces();
let C = new Controller(L, GP);
C.init();
