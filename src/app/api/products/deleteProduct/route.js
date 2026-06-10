import connectToDB from "@/configs/db"
import productModel from "@/models/Product"
import { NextResponse } from "next/server"

export async function DELETE(request){
    try {
        await connectToDB()
        const {id}= await request.json()
        await productModel.findOneAndDelete({_id:id})

        return NextResponse.json({message:"product removed"},{status:200})
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({message:error},{status:500})
    }
}