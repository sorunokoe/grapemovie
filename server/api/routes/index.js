'use strict';

const config = require('../../config');
const jwt = require('jsonwebtoken');
const movies = require('./movie') ;
const users = require('./user');

module.exports = function(app){
    app.get('/', function(req, res) {
        res.render('index', {
            title: "Grape Movie",
            description: "Grape Movie platform to find a movies you ever looking for",
            keywords: "grape movies, films, movies",
            author: config.author,
            app_name: config.app_name
        });
    });
    app.use('/api/users', users)
    app.use('/api/movies', validateUser, movies);
    function validateUser(req, res, next) {
        jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
            if (err) {
                res.json({status:"error", message: err.message, data:null});
            }else{
                req.body.userId = decoded.id;
                next();
            }
        });

    }
    app.use(function(req, res, next){
        res.status(404);
        res.render('404');
    });
    app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500);
        res.render('500');
    });
};