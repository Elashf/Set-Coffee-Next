import connectToDB from "@/configs/db"
import userModel from "../../../../../models/User"
import { generateAccessToken, generateRefreshToken, validateEmail, validatePassword, verifyPassword } from "@/utils/auth"
import { NextResponse } from "next/server"
export async function POST(request) {
try {
    await connectToDB()
    const {email , password} = await request.json()

  const isValidEmail = validateEmail(email)
  const isValidPassword = validatePassword(password)
  if(!isValidEmail || !isValidPassword){
     return Response.json({message:"Email or password is wrong"},{status:419})
  }
 
    const user = await userModel.findOne({email})
 if(!user){
     return Response.json({message:"User not found"},{status:422})
 }

 const isCorrectPasswordWithHash = await verifyPassword(password , user.password)

 if(!isCorrectPasswordWithHash){
    return Response.json({message:"Email or password is invalid"},{status:401})
 }

 const accessToken = generateAccessToken({email})
 const refreshToken = generateRefreshToken({email})
await userModel.findOneAndUpdate({email} , {
   $set:{
      refreshToken
   }
})


 const response = NextResponse.json({message:"User login successfully" ,user:{_id :user._id , name:user.name ,email:user.email ,role:user.role}},{status:200})

 response.cookies.set("token" , accessToken , {
    httpOnly:true,
    path:"/",
    maxAge:60*60*24
 })
 response.cookies.set("refreshToken" ,refreshToken ,{
   httpOnly:true ,
   path:"/",
   maxAge:60*60*24*15
 })


 return response;

} catch (error) {
    return Response.json({message:"unknown error"},{status:500})
}    
}