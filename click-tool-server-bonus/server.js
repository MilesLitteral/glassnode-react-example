const https = require('https');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const hostname = '127.0.0.1';
const port = 3000;
const API_KEY = process.env.REACT_APP_API_KEY;

app.use(cors())

let dataStruct = {gas:[], difficulty:[], minerFee:[]};

https.get('https://api.glassnode.com/v1/metrics/fees/gas_price_mean?a=ETH&api_key=' + API_KEY, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      dataStruct.gas = JSON.parse(data);
      console.log("Data: " + dataStruct);
      console.log(resp.statusCode);
      console.log(resp.headers);
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  })

  https.get('https://api.glassnode.com/v1/metrics/mining/difficulty_latest?a=ETH&api_key=' + API_KEY, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      dataStruct.difficulty = JSON.parse(data);
      console.log("Data: " + dataStruct);
      console.log(resp.statusCode);
      console.log(resp.headers);
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  })

  https.get('https://api.glassnode.com/v1/metrics/fees/volume_mean?a=ETH&api_key=' + API_KEY, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      dataStruct.minerFee = JSON.parse(data);
      console.log("Data: " + dataStruct);
      console.log(resp.statusCode);
      console.log(resp.headers);
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  })

app.get('/', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

app.get('/gas', (req, res) => {
  console.log("data sent: Gwei Price")
  res.send(dataStruct.gas);
})

app.get('/difficulty', (req, res) => {
  console.log("data sent: Hash Cost")
  res.send(dataStruct.difficulty);
})

app.get('/fee', (req, res) => {
  console.log("data sent: Mining Fee")
  res.send(dataStruct.minerFee);
})

app.get('/RetrieveBlockchainInfo', (req, res) => {
  console.log("data sent: Data Structure")
  res.send(dataStruct);
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});