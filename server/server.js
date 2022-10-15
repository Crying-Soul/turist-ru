"use strict";

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const os = require("os");
const userRouter = require("../routes/user.routes");
const mapRouter = require("../routes/map.routes");
const eventRouter = require("../routes/event.routes")
class Server {
    constructor() {
        this.PORT = process.env.PORT || 5000;
        this.ROOT = path.dirname(require.main.filename);
        this.app = express();
        this.localIp = Object.values(os.networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat((i.family === "IPv4" && !i.internal && i.address) || []), [])), [])[0];
    }

    start() {
        this.app.listen(this.PORT, () => {
            console.log(`App listening at ${this.localIp}:${this.PORT}`);
        });
        this.app.use(bodyParser.json());
        this.app.use(cors());

        this.app.use("/api", userRouter);
        this.app.use("/api", mapRouter);
        this.app.use("/api", eventRouter);

        this.app.all("*", (req, res, next) => {
            // console.log(`Got ${req.method} request from ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`);
            res.status(404);
            res.render('404.jade', { title: '404: File Not Found' });

        });




    }
}

module.exports = Server;