const pronto = require('pronto');

const prontoHex = '0000 006C 0000 0022 00AD 00AD 0016 0041 0016 0041 0016 0041 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0041 0016 0041 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 06FB';

const pulseTimes = require("pronto").decode(prontoHex);


function onOff() {
  Puck.IR(pulseTimes);
}

let count = 0;

NRF.setScan(function (packet) {
  if (packet.services[0] == 'beef') {
    let packetCount = parseInt(packet.name.split('-')[1]);
    console.log(packetCount, count);
    if (packetCount > count) {
       count = packetCount;
       onOff();
    }
  }
});