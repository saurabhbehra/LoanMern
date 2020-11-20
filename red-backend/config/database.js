let mongoose = require('mongoose');

class Database {
    constructor() {
        this._connect()
    }
    _connect() {
        mongoose.connect('mongodb://localhost:27017/redcarpet',
        {useUnifiedTopology: true,useFindAndModify: false  })
            .then(() => {
                console.log('Database connection successful');
            })
            .catch(err => {
                console.error('Database connection error'+err)
            })
    }
}
module.exports = new Database()

