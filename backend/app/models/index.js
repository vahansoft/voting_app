const fs        = require('fs');
const path      = require('path');
const mongoose  = require('mongoose');
const config    = require('../../config').mongoose;
const db        = {};

mongoose.connect(config.url, {
    useNewUrlParser: true
});

mongoose.connection.on('error', (error) => {
	console.log("Error while connecting to mongodb", error);
});

mongoose.connection.on('connection', () => {
    console.log("Connection successful");
});

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(__dirname + "/" + file);
        
        db[model.modelName] = model;
    });

module.exports = db;
