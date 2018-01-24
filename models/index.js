'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize('nexus', 'postgres', 'kay',{dialect: 'postgres'});

const models = { 
    User: sequelize.import('./user')
};


models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;