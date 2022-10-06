"use strict";

const express = require("express");
const path = require("path");

const os = require("os");

class Server {
    constructor() {
        this.PORT = process.env.PORT || 5000;
        this.ROOT = require("path").dirname(require.main.filename);
        this.app = express();
    }
    getLocalIp() {
        return Object.values(os.networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat((i.family === "IPv4" && !i.internal && i.address) || []), [])), [])[0];
    }
    start() {
        this.app.listen(this.PORT, () => {
            console.log(`App listening at ${this.getLocalIp()}:${this.PORT}`);
        });
    }
}

module.exports = Server;