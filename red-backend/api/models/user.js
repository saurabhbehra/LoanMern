const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String, 
        required:true,
        min: [3, 'Too short name'],
    },
    email:{
        type: String,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password:{type:String,required:true, min: [4, 'Too short password'],},
    role:{type:String, enum:['customer','agent', 'admin'], default:'customer'}
    
},{timestamps: true});

module.exports = mongoose.model('User',UserSchema);