
const mongoose = require('mongoose');

const imageschema  = mongoose.Schema({
    mimetype : {type : String , required: true},
    encoding : {type : String , required: true},
    originalname : {type : String , required: true},
    filename : {type : String , required: true},
    path : {type : String , required : true},
    size : {type : Number , required : true}
})

const Image = mongoose.model('images' , imageschema);
module.exports = Image;