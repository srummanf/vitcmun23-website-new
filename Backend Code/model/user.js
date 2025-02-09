const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, unique : true, required : true},
    password : {type : String, required : true},
    role : {type : String, default : "customer"}
}, {
    timestamps : true
});

export default mongoose.model('user', UserSchema);