const mongoose = require("mongoose");
const schema = mongoose.Schema;

const AdmSchema= new schema({
    name : String,
    email:String,
    password: String,
    verified:Boolean,
    Caddress : {
        city : String,
        State: String,
        Pin : String,
    },
    Per_address:{
        city : String,
        State: String,
        Pin : String,
    },
    Nationality : String,
});

const Adm = mongoose.model('adm',AdmSchema);
module.exports = Adm;



