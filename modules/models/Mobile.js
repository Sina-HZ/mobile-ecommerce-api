const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mobileSchema = new Schema ({
    id       : {type : Schema.Types.ObjectId},
    name     : {type : String},
    cpu      : {type : String},
    ram      : {type : String},
    camera   : {type : String},
    battery  : {type : String},
    desc     : {type : String},
    price    : {type : String},
    image    : {
        url  : {type : String , contentType : String},
        info : {}
    }
},{timestamps : true});

module.exports = mongoose.model('Mobile',mobileSchema);