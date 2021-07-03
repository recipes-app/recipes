const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EMAIL_PATTERN =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new Schema({
    name:{
        type: String,
        required: 'name is required',
    },
    email:{
        type: String,
        required: 'email is required',
        match: [EMAIL_PATTERN, 'email is not valid'],
        unique: true,
    },
    
    photo:{
        type: String,
    },
    preferences:{
        type: [String],
        default: [],
    },
    author:{
        type: Boolean,
        default: false,
    },
    social:{
        google: {
            type: String,
        },
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
