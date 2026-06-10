import connectToDB from "@/configs/db";
import discountModel from "@/models/discount";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
       await connectToDB();
  const { code, percent, maxUse, uses } = await request.json();

  await discountModel.create({ code, percent, maxUse, uses:0 }); 

  return NextResponse.json({message:"Discount created successfully"},{status:201})


    } catch (error) {
        console.log(error);
        
        return NextResponse.json({message:error.message},{status:500})
    }
  


}
