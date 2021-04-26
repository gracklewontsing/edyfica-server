const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    username: {type: String},
    full_name: {
        type: String, required: true, unique: true, trim: true 
    },
    password: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
      }
},
{collection: 'user'}
)

UserSchema.plugin(uniqueValidator, {
    message: 'Must Be Unique.'
  });
  UserSchema.plugin(passportLocalMongoose);
  UserSchema.plugin(findOrCreate);
module.exports = User = mongoose.model('users', UserSchema)