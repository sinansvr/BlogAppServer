'use strict'

const express = require('express')
const app = express()

//Required Modulesa
require('dotenv').config()
const PORT = process.env.PORT || 8000
const HOST = process.env.HOST || '127.0.0.1'

//DB Connection
require("./src/configs/dbConnection")()

//Home Page Path
app.all('/', (req,res) => {
  res.send({
    error:false,
    message:'Welcome to Blog App server !!!'
  })
})





app.listen(PORT , HOST, ()=> console.log(`http://${HOST}:${PORT}`))