const j2e = require("json2emap")
const express = require("express")
const axios = require("axios");
const app = express()
app.use(express.json())

app.use(function (error, req, res, next) {
    if (error instanceof SyntaxError) {
      res.status(400).send("error");
    } else {
      next();
    }
  });

const server = app.listen(3000, function () {
    console.log("ok port:" + server.address().port)
});

app.post("/", (req, res) => {
    if(!req.query.o) {
        info("POST j2e")
        res.send(j2e(req.body))
    }
    else {
        info("POST j2o")
        try {
            const option = (req.query.o).replace(/\[/g, '.').replace(/\]/g, '')
            const options = option.split(".")
            const result = options.reduce((obj, key) => { return obj[key]}, req.body)
            if(!result || typeof result === "object") {
                res.send(JSON.stringify(result))
            } else {
                res.send(result + "")
            }
        } catch (e) {
            res.send("error")
        }
    }
})

app.get("/", (req, res) => {
    if (!req.query.url || req.query.token !== process.env.token) {
        error("GET ERR")
        res.send("see https://airy-bicycle-aa8.notion.site/JSON-emap-parse-45688feb99ce43f19688ccbd2c53319d")
    } else {
        error("GET")
        axios.get(req.query.url).then(function (response) {
            res.send(j2e(response.data))
        })
    }
})

function getLoggerTime() {
    const now = new Date()
    const date = [now.getFullYear(),z(now.getMonth()),z(now.getDate())].join("/")
    const time = [z(now.getHours()),z(now.getMinutes()),z(now.getSeconds())].join(":")
    return "[" + date + " " + time + "]"
}

function info(msg) {
    console.log("[INFO]" + getLoggerTime() + " " + msg)
}

function error(msg) {
    console.log("[EROR]" + getLoggerTime() + " " + msg)
}

function z(num){
    return ('00' + num).slice(-2);
}