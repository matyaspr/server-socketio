const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const Socket = require('../Model/Socket');
const cors = require('cors');


 const whiteList = [
    'http://localhost:3000',
]

var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }




// clase para inicializar el server y configurar los sockets
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        // Http Server
        this.server = http.createServer( this.app );

        // config de socket
        this.io = socketio( this.server, {  } );

    }




    middleware() {
        this.app.use( express.static( path.resolve( __dirname, '../Public') ) )

        this.app.use( cors(corsOptions) );
    }


    socketConfig() {
        new Socket( this.io );   // enviamos por referencia el socket


    }



    execute() {

        this.middleware();

        this.socketConfig();

        this.server.listen( this.port, () => {
            console.log('Server corriendo en el puerto: ' + this.port);
        });
    }

}



module.exports = Server;