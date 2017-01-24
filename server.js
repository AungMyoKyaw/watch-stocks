const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compression = require('compression');
const glob = require('glob');
const path = require('path');

const app = express();

const config = require('./server/config/config');
const dbUrl = config.db;
const port = config.port || 8080;

//connecting to mongodb
mongoose.connect(dbUrl);
mongoose.connection.on('connected',()=>{
  console.log(`App is using the following db \n${dbUrl}`);
});
mongoose.connection.on('error',()=>{
  console.log(`Error on connecting to ${dbUrl}`);
});
mongoose.connection.on('disconnected',()=>{
  console.log(`Succefully disconnected from \n${dbUrl}`);
});
process.on('SIGINT',()=>{
  mongoose.connection.close(()=>{
    console.log(`Disconnected from db through app Termination`);
    process.exit(0);
  });
})

//enable cors
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

//needed middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(compression());

//launch angular
app.use(express.static(__dirname+'/dist'));

//api list
const routes = glob.sync('./server/route/*.js');
routes.forEach((route)=>{//api list
  app.use('/api',require(route));
});

// 404 redirect
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'dist/index.html'));
})

//starting app
app.listen(port,()=>{
  console.log(`My app is running on port ${port}`);
});
