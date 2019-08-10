const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema ({
    name : {type : String , required : true},
    family : {type : String , required : true},
    password : { type : String , required : true },
    email    : { type : String , required : true , unique : true },
    age      : Number,
    avatar   : String
},{timestamps : true});

userSchema.pre('save',function(next){
    bcrypt.hash(this.password, 10, (err,hash)=>{
        this.password = hash;
        next();
    })
})


module.exports = mongoose.model('User', userSchema);
