import connectToDB from "@/configs/db";
import banModel from "@/models/Ban";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
         await connectToDB()
    const {email , phone} = await request.json()

    await banModel.create({phone , email})

    return NextResponse.json({message:"user banned"},{status:200})
    } catch (error) {
        return NextResponse.json({message:error.message},{status:500})
    }
   
    
}