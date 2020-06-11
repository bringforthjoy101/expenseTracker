var config = require('./config.global');

config.env = 'production';
config.hostname = 'manifestdbinstance.cgq0reqixqsd.us-east-1.rds.amazonaws.com';
config.db = {
    database: 'tracker',
    username: 'trackerUser',
    password: 'PassWordChanged2020',
    host: "manifestdbinstance.cgq0reqixqsd.us-east-1.rds.amazonaws.com",
    sequelizeParams: {
        dialect: 'postgres',
        host: "manifestdbinstance.cgq0reqixqsd.us-east-1.rds.amazonaws.com",
        operatorsAliases: false
    }
}
config.sessionDb = {
    database: 'tracker',
    username: 'trackerUser',
    password: 'PassWordChanged2020',
    host: "manifestdbinstance.cgq0reqixqsd.us-east-1.rds.amazonaws.com",
    sequelizeParams: {
        dialect: 'postgres',
        host: "manifestdbinstance.cgq0reqixqsd.us-east-1.rds.amazonaws.com",
        operatorsAliases: false
    }
}

module.exports = config;

