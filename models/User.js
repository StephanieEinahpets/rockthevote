const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        lowercase: true
    },
    memberSince: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

//pre-save hook to encrypt user passwords on signup
userSchema.pre("save", function(next){
    const user = this
    if(!user.isModified("password")) return next()
    const hash = crypto.createHash("sha256")
    hash.update(user.password)
    user.password = hash.copy().digest("hex")
    next()
})

// method to check encrypted password on login
userSchema.methods.checkPassword = function(passwordAttempt, callback){
    const hash = crypto.createHash("sha256")
    hash.update(passwordAttempt)
    callback(null, this.password === hash.copy().digest("hex"))
}


//method to remove user's password for token/sending the response
userSchema.methods.withoutPassword = function(){
    const user = this.toObject()
    delete user.password
    return user
}



module.exports = mongoose.model("User", userSchema)