const express = require('express');
const app = express();
const routing = require("./routing_sys.js");
require('dotenv').config()
const Recaptcha = require('express-recaptcha').RecaptchaV3

app.use((req, res, next) => {
    console.log(`New request`);
    next();
});

app.use(express.urlencoded({ extended: true }));

const path = require('path')
app.use('/public', express.static(path.join(__dirname, '../frontend')))

app.use('', routing)

app.listen(process.env.PORT, function() {
    console.log(`App is running on ${process.env.PORT}`);
    console.log(`We are currently in a ${process.env.STATE} enviorment`)
});