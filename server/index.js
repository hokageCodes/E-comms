const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()

// Middleware config
app.use(express.json());


// MOngoDB config
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MOngoDB Connected'))
    .catch((err) => console.log(err))

// Starting the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});