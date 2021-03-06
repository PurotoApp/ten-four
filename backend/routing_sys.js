module.exports = (function() {
    var route = require('express').Router();
    const { verify } = require('hcaptcha');
    const path = require('path');
    const express = require('express')
    const request = require('request');

    route.get('/', function(req, res, next) {
        res.sendFile(path.join(__dirname, '../frontend/index.html'));
    });

    route.get('/success', function(req, res, next) {
        res.sendFile(path.join(__dirname, '../frontend/success.html'));
    });

    route.post('/api/send/', async function(req, res, next) {
        await verify(process.env.HCAPTCHA_TOKEN, req.body["h-captcha-response"])
            .then((data) => {
                if (data.success === true) {
                    console.log('success!', data);

                    var headersOpt = {
                        'Content-Type': 'application/json',
                    };
                    request({
                        method: 'post',
                        url: process.env.WEBHOOKADD,
                        form: { "content": `Name:${req.body.subname || "No name provided"}\nMessage:${req.body.msg || "No message error"}  ` },
                        headers: headersOpt,
                        json: true,
                    }, function(error, response, body) {
                        if (error) next()
                    });
                    res.redirect("/success")
                } else {
                    console.log("h captcha failed")
                    next()
                }
            })
    });

    route.use((req, res, next) => {
        res.sendFile(path.join(__dirname, '../frontend/error.html'));
    });

    return route;
})();