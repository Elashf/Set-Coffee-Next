import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function PUT(request ) {
    try {
         await connectToDB()
    const {id} = await request.json()
    const isValidID = mongoose.Types.ObjectId.isValid(id)
   if(!isValidID){
        return Response.json({ message: "شناسه نامعتبر است" },
    { status: 422 })
       }
    const user = await userModel.findOne({_id :id}).lean()
    await userModel.findOneAndUpdate({_id:id},{
        $set:{
            role : user.role ==="USER" ? "ADMIN" : "USER"
        }
    })

    return NextResponse.json({message:"user role updated successfully"},{status:200})
    
    } catch (error) {
        console.log(error);
         return NextResponse.json({message: error.message},{status:500})
         
         
    }
   
}