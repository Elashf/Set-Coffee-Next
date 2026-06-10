import connectToDB from "@/configs/db"
import ContactModel from "../../../../models/Contact"

export async function POST(request) {
    try {
        await connectToDB()
const {name , email ,phone ,company , message } = await request.json()    

if(!name.trim() || !email.trim() ||!phone.trim() ||!company.trim() || !message.trim() ){
    return Response.json({message: "فیلد های ضروری را پر کنید"})
}

await ContactModel.create({name , email ,phone ,company , message})

return Response.json({message:"Request sent"},{status:201})



    } catch (error) {
        console.log(error);
        
        return Response.json({message:"error"},{status:500})
    }

}