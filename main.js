const j2e = require("json2emap")
const express = require("express")
const axios = require("axios")
const app = express()

const server = app.listen(3000, function () {
    console.log("ok port:" + server.address().port)
});

app.get("/", (req, res) => {
    console.log(req.query.url);
    if (!req.query.url) {
        res.send("error")
    } else {
        axios.get(req.query.url).then(function (response) {
            res.send(j2e(response.data))
        })
    }
})