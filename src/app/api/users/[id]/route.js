import connectToDB from "@/configs/db"
import userModel from "@/models/User"
import { NextResponse } from "next/server"

export async function PUT(request , {params}) {
    try {
         await connectToDB()

    const {name , email} = await request.json()
    const {id} =await params

   const updateUser = await userModel.findByIdAndUpdate(id,{name , email},
     {
          new:true,
          runValidators:true
     }
   )
   
 return NextResponse.json(updateUser);
    } catch (error) {
         return NextResponse.json(
      { message: "server error" },
      { status: 500 }
    );
    }
}



