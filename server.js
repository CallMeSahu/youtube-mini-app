require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const videoRoutes = require('./routes/videoRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

app.use('/', videoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});