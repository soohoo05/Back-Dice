const express = require ('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express()
const db = require('./config/db')
const port = 3000;
var cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({extended:true}))



 MongoClient.connect(db.url,(err,database)=>{
   if(err) return console.log(err)
   require('./app/routes')(app,database)
   app.listen(port, ()=>{
     console.log("live on http://localhost:"+port)
   })
 })
