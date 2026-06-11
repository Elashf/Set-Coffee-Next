import mongoose from "mongoose"

const connectToDB =async ()=>{
    try {
        if(mongoose.connections[0].readyState){
        return true
    }else{
await mongoose.connect(process.env.MONGODB_URI)
console.log('connect to DB duccessfully :))');

    } 
    } catch (error) {
        console.log('connect to DB has error :' , error);
        
    }
   
}
export default connectToDB