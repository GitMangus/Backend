const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

const URL = process.env.URL_MONGO
//const URL = `mongodb+srv://Mango:pass@clusterbackend.yu80rne.mongodb.net/?retryWrites=true&w=majority`

let connection = null

module.exports = () => {
    if (connection) {
        return connection
    }
    connection = mongoose.connect(URL, {
        useNewUrlParser: true
    })
}