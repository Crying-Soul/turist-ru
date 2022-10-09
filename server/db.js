"use strict";
const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
    user: process.env.USER_POSTGERS,
    password: process.env.PASSWORD_POSTGRES,
    host: process.env.HOST_POSTGRES,
    port: process.env.PORT_POSTGRES,
    database: process.env.DBNAME_POSTGRES,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;