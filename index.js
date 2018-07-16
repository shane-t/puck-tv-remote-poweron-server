const bleno = require('bleno');
const name = 'name';
const serviceUuids = ['beef'];
const http = require('http');

let count = 0;
let state = '';

bleno.on('stateChange', _state => {
  state = _state;
  console.log('powered on');
});

function transmit() {
  count++;
  if (state === 'poweredOn') {
    const name = 'power-' + count;
    console.log('advertising', name);
    bleno.startAdvertising(name, serviceUuids, callback)
    setTimeout(function () {
      console.log('Stop advertising');
      bleno.stopAdvertising();
    }, 5000);
  } else {
    console.error('Not powered on!');
  }
}

function callback(err) {
  console.log(err);
}

http.createServer( (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('OK');
  if (req.url == '/send') {
    transmit();
  }
  res.end();
}).listen(8080);

