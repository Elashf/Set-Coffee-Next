import mongoose from "mongoose";

const schema = new mongoose.Schema({
code:{
    type: String,
    required :true
},
percent:{
    type: Number,
    required :true
},
maxUse:{
    type: Number,
    required :true
},
uses:{
    type: Number,
    required :true
},


})

const model = mongoose.models.discount || mongoose.model("discount" , schema)

export default model