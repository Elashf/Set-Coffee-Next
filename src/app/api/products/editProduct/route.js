import connectToDB from "@/configs/db";
import productModel from "@/models/Product"; 
import { NextResponse } from "next/server";
export async function PUT(request) {
    try {
        await connectToDB()
        const {id,name , price} = await request.json()

        await productModel.findOneAndUpdate({ _id:id},{
            $set:{
                name , price
            }
        })
return NextResponse.json({message:"Product changed successfully"},{status:200})

    } catch (error) {
        console.log(error);
        
        return NextResponse.json({message:error},{status:500})
    }
}