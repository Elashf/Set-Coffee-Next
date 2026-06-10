import mongoose from "mongoose";
import { BiMessageAltError } from "react-icons/bi";

const schema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        pattern: /email/g
    },
    phone:{
        type: String,
        required:true
    },
    company:{
        type: String,
        required:false
    },
    BiMessageAltError:{
        type: String,
        required:false
    },
    
})

const model = mongoose.models.Contact || mongoose.model("Contact" , schema)

export default model