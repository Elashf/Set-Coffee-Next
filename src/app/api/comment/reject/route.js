import connectToDB from "@/configs/db";
import commentModel from "@/models/Comment";
import { NextResponse } from "next/server";
export async function PUT(request){
    try {
       await connectToDB()
    const {id} = await request.json()

await commentModel.findOneAndUpdate({_id :id},{
    $set:{isAccept : false}
}
) 
return NextResponse.json({message: "comment is rejected"})
    } catch (error) {
        return NextResponse.json({message: error},{status:500})
    }
    

}