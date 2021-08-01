

const express = require('express');
const cors = require('cors');
const app = express();
const router = require(__dirname + '/routes/routes.js');
const mongoose = require('mongoose');

const mySecret = process.env['DB_NAME']

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'));
app.use("/api/uploads" ,express.static('uploads'));
app.use(router);




mongoose.connect(mySecret, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    
    console.log("connected to database");
    
});




app.listen(3000 , function(){
    console.log("connected");
})






