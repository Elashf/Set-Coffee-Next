import connectToDB from "@/configs/db"
import { authUser } from "@/utils/authUser"
import ticketModel from "../../../../models/Ticket"



export async function POST(request) {
    try {
         await connectToDB()
    const user = await authUser()
    
    
    const {title , body , department , subDepartment , priority} = await request.json()

    await ticketModel.create({title , body , department , subDepartment , priority , user:user._id})
    return Response.json({message: "Ticket created successfully"},{status:201})
    } catch (error) {
        console.log(error);
        return Response.json({message: error.message},{status:500})
    }
   }