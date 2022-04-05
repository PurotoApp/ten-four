module.exports = (function() {
    var route = require('express').Router();
    const { verify } = require('hcaptcha');
    const path = require('path');
    const express = require('express')

    route.get('/', function(req, res, next) {
        res.sendFile(path.join(__dirname, '../frontend/index.html'));
    });

    route.post('/api/send/', function(req, res, next) {
        if (req.query.msg == undefined) {
            res.sendFile(path.join(__dirname, '../frontend/index.html')); // add error page later
        }
        console.log(req.body["h-captcha-response"])
        verify(process.env.HCAPTCHA_TOKEN, req.body["h-captcha-response"])
            .then((data) => {
                if (data.success === true) {
                    console.log('success!', data);
                } else {
                    console.log('verification failed');
                }
            })
            .catch(console.error);
        res.redirect('/');
    });

    route.use((req, res, next) => {
        res.sendFile(path.join(__dirname, '../frontend/404.html'));
    });

    return route;
})();