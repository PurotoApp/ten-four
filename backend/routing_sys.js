module.exports = (function() {
    var route = require('express').Router();
    const hcaptcha = require('express-hcaptcha');
    const path = require('path');
    const express = require('express')

    route.get('/', function(req, res, next) {
        res.sendFile(path.join(__dirname, '../frontend/index.html'));
    });

    route.post('/api/send/', function(req, res, next) {
        if (req.query.msg == undefined) {
            res.sendFile(path.join(__dirname, '../frontend/index.html')); // add error page later
        }
        console.log(req.body.msg)
        res.redirect('/');
    });

    route.use((req, res, next) => {
        res.sendFile(path.join(__dirname, '../frontend/404.html'));
    });

    return route;
})();