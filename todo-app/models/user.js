import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    name:{
        type:"string",
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
        select:false,
        minLength:[5, 'password too short'],
    }
});

mongoose.models = {}
export const User = mongoose.model('User', Schema);