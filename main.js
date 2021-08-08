const j2e = require("json2emap")
const express = require("express")
const axios = require("axios");
const app = express()
app.use(express.json())

const server = app.listen(3000, function () {
    console.log("ok port:" + server.address().port)
});

app.post("/", (req, res) => {
    if(!req.query.o) {
        res.send(j2e(req.body))
    }
    else {
        res.send(req.body[req.query.o] + "")
    }
})

app.get("/", (req, res) => {
    if (!req.query.url || !req.query.token !== process.env.token) {
        res.send("error")
    } else {
        axios.get(req.query.url).then(function (response) {
            res.send(j2e(response.data))
        })
    }
})