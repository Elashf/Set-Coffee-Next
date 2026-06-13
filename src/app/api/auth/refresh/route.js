import { generateAccessToken, verifyRefreshToken } from "@/utils/auth"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import userModel from "@/models/User"
import connectToDB from "@/configs/db"
export async function POST(request) {
    try {
        await connectToDB()
        const refreshToken= (await cookies()).get("refreshToken")?.value
           if(!refreshToken){
             return NextResponse.json({message:"Refresh token not found"},{status:401})
           }
        const payload = verifyRefreshToken(refreshToken)
        if(!payload){
            return NextResponse.json({message:"Refresh token is not valid"},{status:401})
        }
        const user = await userModel.findOne({
            email: payload.email
        })
        if(!user){
            return NextResponse.json({message:"Refresh not found"},{status:404})
        }
        if(user.refreshToken !== refreshToken){
            return NextResponse.json({message:"Refresh token mismatch"},{status:401})
        }
        const newAccessToken = generateAccessToken({email:user.email})

       const response =  NextResponse.json({message:"New access token generated"},{status:200})
    
       response.cookies.set("token" , newAccessToken,{
        httpOnly:true,
   path:"/",
   maxAge:60*60*24
       })

     return response
    
    } catch (error) {
        return NextResponse.json({message: error.message},{status:500})
    }
}