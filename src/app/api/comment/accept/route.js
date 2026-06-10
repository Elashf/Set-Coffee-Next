import connectToDB from "@/configs/db";
import commentModel from "@/models/Comment";
import { authAdmin } from "@/utils/authUser";
import { NextResponse } from "next/server";
export async function PUT(request){
    try {
        const isAdmin = await authAdmin()
        if(!isAdmin){
            throw new Error("This api is protected !")
        }
       await connectToDB()
    const {id} = await request.json()

await commentModel.findOneAndUpdate({_id :id},{
    $set:{isAccept : true}
}
) 
return NextResponse.json({message: "comment is accepted"})
    } catch (error) {
        return NextResponse.json({message: error.message},{status:500})
    }
    

}