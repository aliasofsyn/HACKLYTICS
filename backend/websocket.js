const WebSocketServer = require('ws');


function initalizeWebSocket(server){
    const wss = WebSocketServer.Server({ port: server });

    wss.on('connection', (ws) =>{
      console.log("Connected");
      
      ws.on('message', (message) => {
        console.log('Received message:', message);
        
      // Process the message (for example, echo it back)
        ws.send(`Server received: ${message}`);
      });
  
      ws.on('close', () => {
        console.log('Client disconnected');
      });

    })
}
module.exports = {initalizeWebSocket} 