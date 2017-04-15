/*jshint esversion: 6 */
const net = require('net');
let res = false;


function generateConnection(number = 0){
const content = {
video_id: "X0p-VS7j03E", username: "Charly", guess: number
};

    const header = `POST /bouncer HTTP/1.1
Content-Type: application/json
Content-Length: ${JSON.stringify(content).length}

${JSON.stringify(content)}`;

  const client = net.createConnection({ port: 8081, host: "10.0.1.11"}, () => {

    client.write(header);

    console.log(content.guess);

    let res = "";

    client.on('data', (data) => {

      res = data.toString().split('\n')[8].slice(11,data.toString().split('\n')[8].indexOf(","));
      if(res === "false"){
        generateConnection(++number);
        console.log(res);
      } else {
        process.exit();
      }

    });

  });
}

generateConnection();
