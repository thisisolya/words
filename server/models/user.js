const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({    
    english:  String, 
    russian: String,
})


const UserSchema = new mongoose.Schema({    
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    words: [{
        type: WordSchema,
    }],
})

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
