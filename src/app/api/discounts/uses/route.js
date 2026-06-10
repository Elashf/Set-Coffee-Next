import connectToDB from "@/configs/db";
import discountModel from "@/models/discount";
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        await connectToDB()
       const {code} =await request.json()

       const discount =await discountModel.findOne({code})
       await discountModel.findOneAndUpdate({code},{
        $inc:{
            uses :1
        }
       })
       if(!discount){
        return NextResponse.json({message:"Code not found"},{status:404})
       }else if(discount.uses === discount.maxUse){
        return NextResponse.json({message:"Code expired"},{status:422})
       }else{
       
        return NextResponse.json(discount)
       }

    } catch (error) {
        return NextResponse.json({message:error},{status:500})
    }
}