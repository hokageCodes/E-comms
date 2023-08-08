const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const { config } = require('dotenv');
config();

app.use(cors())
app.use(express.json());
app.use(session({
    secret: 'hello. world',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/api/auth', require('./routes/auth'));

mongoose
    .connect("mongodb+srv://busayoogunde:orochimaru1@euphoria.jcqunvq.mongodb.net/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Failed to connect to MongoDB:', error));


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
