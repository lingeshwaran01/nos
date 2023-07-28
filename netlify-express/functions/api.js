const express =require('express')
const serveless=require('serverless-http');
const fs = require('fs');

const app=express()
const router=express.Router()
router.post('/',(req,res)=>{
    if (req.method === 'POST') {
        let data = '';
    
        // Listen for incoming data
        req.on('data', chunk => {
          data += chunk;
            console.log(data)
        });
    
        // When all data has been received
        req.on('end', () => {
          // Handle the received data (You can process or save the data here)
          console.log('Received data:', data);

         
          // Send a response back to the client
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('POST request received successfully!');
        });
      } else {
        // Handle other HTTP methods
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
      }
    });

app.use('/.netlify/functions/api',router)
module.exports.handler=serveless(app)
