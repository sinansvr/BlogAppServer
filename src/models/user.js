"use strict"

const { Schema, model } = require("mongoose")
const { default: isEmail } = require("validator/lib/isEmail")

const{isEmail}=require("validator")
const passwordEncrypt = require("../helpers/passwordEncrypt")

// {
//     "username": "admin",
//     "password": "aA*123456",
//     "email": "admin@site.com",
//     "first_name": "admin",
//     "last_name": "admin",
//     "image":"",
//     "bio":"",
//     "isAdmin": true
// }
// {
//     "username": "staff",
//     "password": "aA*123456",
//     "email": "staff@site.com",
//     "first_name": "staff",
//     "last_name": "staff",
//     "image":"",
//     "bio":"",
//     "isAdmin": false
// }
// {
//     "username": "test",
//     "password": "aA*123456",
//     "email": "test@site.com",
//     "first_name": "test",
//     "last_name": "test",
//     "image":"",
//     "bio":"",
//     "iAdmin": false
// }

// User Model:
const UserSchema=new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },
    
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true,
        validator:[isEmail,"Email type is not correct"]
    },
    password: {
        type: String,
        trim: true,
        required: true,
        // set:(password)=>passwordEncrypt(password)
    },
    first_name: {
        type: String,
        trim: true,
        required: true
    },
    last_name: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
        required: false
    },
    bio: {
        type: String,
        trim: true,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
​
},{ collection: 'users', timestamps: true })


UserSchema.pre("save",function(next){
    if(this.password){
        // pass == (min 1: lowerCase, upperCase, Numeric, @$!%*?& + min 8 chars)
    const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+.,]).{8,}$/.test(this.password)

    if(isPasswordValidated){
        this.password = passwordEncrypt(this.password)
    }else{ next(new Error("Password is not valid"))}

    next()
}
})


module.exports=model("User",UserSchema)