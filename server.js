const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compression = require('compression');
const glob = require('glob');
const path = require('path');

const app = express()

const config = require('./server/config/config');
const port = config.port || 8080;

// enable cors
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
const server = app.listen(port,()=>{
  console.log(`My app is running on port ${port}`);
});

//starting ws server
const io = require('socket.io')(server);
let recentStock = [];

io.on('connection',(socket)=>{
  socket.emit('news',recentStock);

  socket.on('add_to_r_s',(data)=>{
    recentStock.push(data);
    socket.broadcast.emit('news',recentStock);
  });

  socket.on('rm_from_r_s',(data)=>{
    let itemIndex = recentStock.indexOf(data);
    recentStock.splice(itemIndex,1);
    socket.broadcast.emit('news',recentStock);
  });

  socket.on('rm_sliently',(data)=>{
    let itemIndex = recentStock.indexOf(data);
    recentStock.splice(itemIndex,1);
    socket.emit('news',recentStock);
  });
})
