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
        });
    
        // When all data has been received
        req.on('end', () => {
          // Handle the received data (You can process or save the data here)
          console.log('Received data:', data);

          // Specify the file path
          const filePath = 'i.txt';
          data+="\n"
          // Write the data to the file
          fs.appendFile(filePath, data, (err) => {
            if (err) {
              console.error('Error writing to file:', err);
            } else {
              console.log('Data has been written to the file successfully!');
            }
          });
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