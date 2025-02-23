const WebSocketServer = require('ws');

function initializeWebSocket(server){
    const wss = new WebSocketServer.Server({ server });

    wss.on('connection', (ws) =>{
      console.log("Connected");
      
      ws.on('message', (message) => {
        console.log('Received message:', message.toString());
        
      // Process the message (for example, echo it back)
        ws.send(`Server received: ${message}`);
      });
  
      ws.on('close', () => {
        console.log('Client disconnected');
      });

    })
}
module.exports = {initializeWebSocket} 