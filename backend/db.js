const { default: mongoose } = require('mongoose');


const mongopse = require('mongoose');
const mongoURI = "mongodb://localhost:27017";

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Mongoose connected successfully");
    })
}

module.exports = connectToMongo