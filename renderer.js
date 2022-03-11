// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { SerialPort } = require('serialport')
const tableify = require('tableify')

var Port = new SerialPort({ path: "COM3", baudRate: 9600, autoOpen: false }, function (err) {
  if (err) {
    return console.log('Error: ', err.message)
  }

});
const { ReadlineParser } = require('@serialport/parser-readline')

const parser = new ReadlineParser({
  delimiter: '\r\n'
})
Port.pipe(parser);

Port.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message)
  }
})

async function listSerialPorts() {
  await SerialPort.list().then((ports, err) => {
    if (err) {
      document.getElementById('error').textContent = err.message
      return
    } else {
      document.getElementById('error').textContent = ''
    }
    console.log('ports', ports);

    if (ports.length === 0) {
      document.getElementById('error').textContent = 'No ports discovered'
    }

    tableHTML = tableify(ports)
    document.getElementById('ports').innerHTML = tableHTML
  })
}
function myfunction2() {
  Port.write('o', function (err) {
    if (err) {
      return console.log('Error on write: ', err.message)
    }
    console.log('message written')

  })
}
function myfunction3() {
  Port.write('f', function (err) {
    if (err) {
      return console.log('Error on write: ', err.message)
    }
    console.log('message written')

  })
}
function myfunction() {



  listSerialPorts()


  console.log("button pressed 0")
}

function myfunction1() {

  let scalew = document.getElementById("scale")
  let dispatchw = document.getElementById("dispatch")
  parser.on('data', function (data) {
    let trolleyw = Number(document.getElementById("trolley").value)

      //console.log('Received data from port: ' + data);
    scalew.value = Number(data);
    dispatchw.value = Number(scalew.value) - trolleyw;
    // Port.write('o')
  });



  console.log("button pressed 1")
}

function myfunction5() {



  window.print()


  console.log("button pressed 5")
}
function listPorts() {
  listSerialPorts();
  // setTimeout(listPorts, 2000);
}

// Set a timeout that will check for new serialPorts every 2 seconds.
// This timeout reschedules itself.
//setTimeout(listPorts, 2000);


