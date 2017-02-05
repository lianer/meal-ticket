// node server.js 启动本地预览
var express = require('express')
var app = express()
app.use(express.static('./dist'))
app.listen('4000')
