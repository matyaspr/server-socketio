const Band = require("./Band");



class Bands {

    constructor() {
            
        this.bands = [
            new Band("Metallica"),
            new Band("Iron Maiden"),
            new Band("AC/DC"),
            new Band("Pink Floyd"),
        ];
    }


    addBand(bandName) {
        this.bands.push(new Band(bandName));
        return this.bands;
    }

    removeBand(bandId) {
        this.bands = this.bands.filter(band => band.id !== bandId);
        return this.bands;
    }

    getBands() {
        return this.bands;
    }

    increaseVote(bandId) {
        this.bands.forEach(band => {
            if (band.id === bandId) {
                band.votes++;
            }
        });
        
        return this.bands;
    }


    decrease(bandId) {
        this.bands.forEach(band => {
            if (band.id === bandId && band.votes > 0) {
                band.votes--;
            }
        });
        
        return this.bands;
    }

    changeName(bandId, newName) {
        this.bands.forEach(band => {
            if (band.id === bandId) {
                band.name = newName;
            }
        });
        
        return this.bands;
    }
}




module.exports = Bands;
