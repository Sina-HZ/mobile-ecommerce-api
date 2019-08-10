const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mobileImgSchema = new Schema ({
    image      : {
        url  : {type : String, contentType : String},
        info : {}
    },
    mobile  : {type : Schema.Types.ObjectId, ref : 'Mobile'}
},{timestamps : true});

module.exports = mongoose.model('MobileImg',mobileImgSchema);