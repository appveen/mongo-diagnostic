const express = require('express');
const log4js = require('log4js');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const config = require('./config');


log4js.configure({
    appenders: { out: { type: 'stdout', layout: { type: 'basic' } } },
    categories: { default: { appenders: ['out'], level: 'debug' } }
});

const app = express();
const logger = log4js.getLogger('Server');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


function connectMongoClientAuthor() {
    return new Promise((resolve, reject) => {
        try {
            logger.info('mongo author options:', config.mongoAuthorOptions);
            MongoClient.connect(config.mongoUrl, config.mongoAuthorOptions, async (error, client) => {
                if (error) {
                    logger.error(error.message + '\n\n\n');
                }
                if (client) {
                    logger.info('Connected to Author DB\n\n\n');
                } else {
                    logger.info('Connected to Author DB but client not found\n\n\n');
                }
                resolve();
            });
        } catch (err) {
            logger.error('======================================================');
            logger.error('Unable to connect to MongoDB using Mongo Client');
            logger.error(err);
            logger.error('======================================================\n\n\n');
            resolve();
        }
    });
}


function connectMongooseAuthor() {
    return new Promise((resolve, reject) => {
        try {
            logger.info('mongo author options:', config.mongoAuthorOptions);
            mongoose.connect(config.mongoUrl, config.mongoAuthorOptions, (err) => {
                if (err) {
                    logger.error('Unable to connect to Author\n\n\n');
                    logger.error(err);
                } else {
                    logger.info('Connected to Author DB');
                    logger.debug(`Connected to URL: ${mongoose.connection.host}`);
                    logger.debug(`Connected to DB:${mongoose.connection.name}`);
                    logger.debug(`Connected via User: ${mongoose.connection.user}\n\n\n`);
                }
                resolve();
            });
        } catch (err) {
            logger.error('======================================================');
            logger.error('Unable to connect to MongoDB using mongoose');
            logger.error(err);
            logger.error('======================================================\n\n\n');
            resolve();
        }
    });
}


function connectMongoClientAppcenter() {
    return new Promise((resolve, reject) => {
        try {
            logger.info('mongo appcenter options:', config.mongoAppcenterOptions);
            MongoClient.connect(config.mongoAppcenterUrl, config.mongoAppcenterOptions, async (error, db) => {
                if (error) {
                    logger.error(error.message + '\n\n\n');
                }
                if (db) {
                    logger.info('Connected to Appcenter DB\n\n\n');
                } else {
                    logger.info('Connected to Appcenter DB but client not found\n\n\n');
                }
                resolve();
            });
        } catch (err) {
            logger.error('======================================================');
            logger.error('Unable to connect to MongoDB using Mongo Client');
            logger.error(err);
            logger.error('======================================================\n\n\n');
            resolve();
        }
    });
}


function connectMongooseAppcenter() {
    return new Promise((resolve, reject) => {
        try {
            logger.info('mongo appcenter options:', config.mongoAppcenterOptions);
            mongoose.connect(config.mongoAppcenterUrl, config.mongoAppcenterOptions, (err) => {
                if (err) {
                    logger.error('Unable to connect to Appcenter\n\n\n');
                    logger.error(err);
                } else {
                    logger.info('Connected to Appcenter DB');
                    logger.debug(`Connected to URL: ${mongoose.connection.host}`);
                    logger.debug(`Connected to DB:${mongoose.connection.name}`);
                    logger.debug(`Connected via User: ${mongoose.connection.user}\n\n\n`);
                }
                resolve();
            });
        } catch (err) {
            logger.error('======================================================');
            logger.error('Unable to connect to MongoDB using mongoose');
            logger.error(err);
            logger.error('======================================================\n\n\n');
            resolve();
        }
    });
}


async function init() {

    logger.info('======================================================');
    logger.info('ENV Variables');
    logger.info('======================================================');
    logger.info(config);
    logger.info('======================================================\n\n\n');
    logger.info('======================================================');
    logger.info('Trying to connect to MongoDB using mongoose');
    logger.info('======================================================');
    await connectMongooseAuthor();
    await connectMongooseAppcenter();
    logger.info('======================================================');
    logger.info('Trying to connect to MongoDB using Mongo Client');
    logger.info('======================================================');
    await connectMongoClientAuthor();
    await connectMongoClientAppcenter();
}


app.get('/env', function (req, res) {
    res.json(process.env);
});
app.get('/config', function (req, res) {
    res.json(process.config);
});

app.listen(8080, function () {
    logger.info('Server is listening on port 8080\n\n\n');
    init();
});








