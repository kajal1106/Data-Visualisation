const express = require('express');
var app = express();
const fetch = require('node-fetch')
const port = 2048; // port to listen
var cors = require('cors') // for cross origin resource sharing
app.use(cors()) 

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); // This displays message that the server running and listening to specified port

// create a GET route
app.get('/getData', async (req, res) => { // This is the route to get the data from the server
  try{
    const apiResponse = await fetch(
      'https://reference.intellisense.io/thickenernn/v1/referencia'
    )
    const apiResponseJson = await apiResponse.json()
    console.log(apiResponseJson)
    res.send(apiResponseJson)
  }
  catch(err){
    console.log(err)
    res.status(500).send('Something went wrong')
  }
});