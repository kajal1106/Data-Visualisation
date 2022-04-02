const express = require('express');
var http = require('http');
var app = express();

const port = 2048; // port to listen
var cors = require('cors') // for cross origin resource sharing
app.use(cors()) 

const fs = require('fs');

let rawData = fs.readFileSync('data.json'); 
let student = JSON.parse(rawData); 
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); // This displays message that the server running and listening to specified port

// create a GET route
app.get('/express_backend', (req, res) => { // This is the route to get the data from the server
  res.send(student);
  // res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11