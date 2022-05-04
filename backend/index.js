const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit')
const routing = require("./routing_sys.js");
require('dotenv').config()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
})

app.use(limiter)

app.use(express.urlencoded({ extended: true }));

const path = require('path')
app.use('/public', express.static(path.join(__dirname, '../frontend')))

app.use('', routing)

app.listen(process.env.PORT, function() {
    console.log(`App is running on ${process.env.PORT}`);
    console.log(`We are currently in a ${process.env.STATE} enviorment`)
});