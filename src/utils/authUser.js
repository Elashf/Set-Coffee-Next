import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import userModel from "../../models/User"; 
import connectToDB from "@/configs/db";
 
const authUser = async()=>{
await connectToDB()

 const token = (await cookies()).get("token")?.value
  let user =null

  if(token){
    const tokenPayload = verifyAccessToken(token)
    if(tokenPayload){
    user =await userModel.findOne({email : tokenPayload.email})
    }}
    return user
  }

  
 
const authAdmin = async()=>{
await connectToDB()

 const token = (await cookies()).get("token")?.value
  let user =null

  if(token){
    const tokenPayload = verifyAccessToken(token)
    if(tokenPayload){
    user =await userModel.findOne({email : tokenPayload.email})

    if(user.role === "ADMIN"){
      return user
    }else{
      return null
    }

    }else{
      return null
    }
  }else{
      return null
    }
    return user
  }
  export  {authUser , authAdmin}

