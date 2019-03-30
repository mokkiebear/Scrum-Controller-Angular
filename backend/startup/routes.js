const express = require('express');
//Routers
const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');
const projectsRouter = require('../routes/projects');
const iterationsRouter = require('../routes/iterations');
const cardsRouter = require('../routes/cards');
const authRouter = require('../routes/auth');

var cookieParser = require('cookie-parser');
const cors = require('cors');

module.exports = function(app){
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    
    app.use((req, res, next) => {
        res.set(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
        res.set('Access-Control-Expose-Headers','Authorization');
        next();
    });

    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/projects', projectsRouter);
    app.use('/iterations', iterationsRouter);
    app.use('/cards', cardsRouter);
    app.use('/auth', authRouter);
};