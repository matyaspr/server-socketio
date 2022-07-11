const Bands = require("./Bands");



class Socket {

    constructor( io ) {
        this.io = io;
        this.bands = new Bands();
        this.socketEvents();
    }


    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            console.log('Socket conectado');

            // Emitir al cliente conectado, todas las bandas actuales 
            socket.emit('current-bands',  this.bands.getBands() );
        
            // Recbir del cliente eventos
            socket.on('vote', ({ id }) => {
                this.bands.increaseVote(id);
                this.io.emit('current-bands', this.bands.getBands());
            })
        
            socket.on('vote-decrease', ({ id }) => {
                this.bands.decrease(id);
                this.io.emit('current-bands', this.bands.getBands());
            })


            socket.on('delete-band', ({ id }) => {
                this.bands.removeBand(id);
                this.io.emit('current-bands', this.bands.getBands());
            })
            
            socket.on('change-name', ({ id, name }) => {
                this.bands.changeName(id, name);
                this.io.emit('current-bands', this.bands.getBands());
            })
        
            socket.on('add-band', ({ name }) => {
                this.bands.addBand(name);
                this.io.emit('current-bands', this.bands.getBands());
            })


        })
    }
}


module.exports = Socket;