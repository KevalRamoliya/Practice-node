const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/students-api")
.then(() => {
 console.log("Connected to Mongo");   
}).catch((err) => {
    console.log("Error connecting to Mongo", err); 
});