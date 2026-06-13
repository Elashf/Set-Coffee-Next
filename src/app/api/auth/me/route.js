import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import userModel from "../../../../../models/User";
import connectToDB from "@/configs/db";
import { NextResponse } from "next/server";

/*export async function GET(request) {
    await connectToDB()
let user =null
    const token = (await cookies()).get("token")?.value
    if(token){
        const tokenPayload = verifyAccessToken(token)
    
        if(tokenPayload){
             user = await userModel.findOne({email :tokenPayload.email} , "-password -refreshToken -__v")

        }
         return NextResponse.json(user)
    }else{
         return NextResponse.json({data:null ,message:"Not access" },{status:401})
    }

    
}*/


export async function GET() {
  await connectToDB();

  const token =(await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const tokenPayload = verifyAccessToken(token);

  if (!tokenPayload) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = await userModel.findOne(
    { email: tokenPayload.email },
    "-password -refreshToken -__v"
  );

  return NextResponse.json({ user });
}