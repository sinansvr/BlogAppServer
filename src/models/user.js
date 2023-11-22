"use strict"
/* -------------------------------------------------------
    USERS BLOG APP
------------------------------------------------------- */
/* ------------------------------------------------------- *
{
    "username": "admin",
    "password": "aA?123456",
    "email": "admin@site.com",
    "first_name": "admin",
    "last_name": "admin",
    "image":"",
    "bio":"",
    "isAdmin": true
}
/* ------------------------------------------------------- */
const { Schema, model } = require('mongoose')
const { isEmail } = require('validator') // for Validate process : npm i validator
const passwordEncrypt = require('../helpers/passwordEncrypt')
// User Model:
const UserSchema = new Schema({
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
        validate: [isEmail, "Email type is not correct"]
    },
    password: {
        type: String,
        trim: true,
        required: true
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
    },
    bio: {
        type: String,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
},{ collection: 'users', timestamps: true })
/* ------------------------------------------------------- */
// Schema Configs:
// UserSchema.pre('save', function(next){
//     if(this.password){
//         const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+.,])[A-Za-z\d@$!%*?&+.,].{8,}$/.test(this.password)
//         if(isPasswordValidated){
//             this.password = passwordEncrypt(this.password)
//         }else{
//             next(new Error("Password not validated."))
//         }
//         next()
//     }
// })
// UserSchema.pre('init', function (data) {
//     data.id = data._id
// })
UserSchema.pre(['save', 'updateOne'], function (next) {
    // get data from "this" when create;
    // if process is updateOne, data will receive in "this._update"
    const data = this?._update || this
    {
        if (data?.password) {
            // pass == (min 1: lowerCase, upperCase, Numeric, @$!%*?& + min 8 chars)
            const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password)
            if (isPasswordValidated) {
                this.password = data.password = passwordEncrypt(data.password)
                this._update = data // updateOne will wait data from "this._update".
            } else {
                next(new Error('Password not validated.'))
            }
        }
        next() // Allow to save.
    }
})
/* ------------------------------------------------------- */
// FOR REACT PROJECT:
UserSchema.pre('init', function (data) {
    data.id = data._id
})
/* ------------------------------------------------------- */
module.exports = model('User', UserSchema)