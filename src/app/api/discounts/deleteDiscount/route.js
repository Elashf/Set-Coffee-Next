import connectToDB from "@/configs/db";
import discountModel from "@/models/discount";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    try {
        await connectToDB()
const{id} = await request.json()
await discountModel.findOneAndDelete({_id:id})
return NextResponse.json({message:"Discount removed successfully"},{status:200})
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({message:error},{status:500})
    }

}