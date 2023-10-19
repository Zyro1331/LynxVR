import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 9555 });

function currentTime() {
  var now = new Date();
  var time = now.toLocaleTimeString();
  return String(`${time}`);
}

/* Used for LynxVR */
wss.on('connection', function connection(ws) {
  console.log("Resonite/Watch has connected.")
  ws.on('message', function message(data) {
    console.log(currentTime() + ' received: %s', data);

    var debugging_mode = false;
    if(debugging_mode == true) {
      wss.clients.forEach(client => client.send("bpm=" + testing_bpm + ",bat=" + battery.toFixed(2) + ",bat_charging=true"));
    } else {
      wss.clients.forEach(client => client.send(data.toString()));
    }
  });
});