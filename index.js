const express = require('express');
const playerRouter = require('./player/router')
const bodyParser = require('body-parser')
const teamRouter = require('./team/router')
const app = express();
const port = 4000;
const jsonParser = bodyParser.json()
app.use(jsonParser)
app.use(teamRouter)
app.use(playerRouter)
app.listen(port,()=>{console.log(`Listening on :${port}`)})