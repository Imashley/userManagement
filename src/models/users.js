'use strict';
//=============================================================================
/**
 * Module dependencies
 */
//=============================================================================
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-beautiful-unique-validation');
mongoose.Promise = require('bluebird');

//=============================================================================
/**
 * user Schema
 */
//=============================================================================
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: [true, "Please add a username"]
    },
    password: {
        type: String,
        lowercase: true,
        required: [true, "Please add a password"]
    }
}, { timestamps: true }).plugin(uniqueValidator);
userSchema.index({ username: 1 }, { unique: true });
userSchema.set('toObject', { virtuals: true, getters: true });


//=============================================================================
/**
 * Compile to Model
 */
//=============================================================================
const userModel = mongoose.model('User', userSchema);
//=============================================================================
/**
 * Export  Model
 */
//=============================================================================
module.exports = userModel;
//=============================================================================
