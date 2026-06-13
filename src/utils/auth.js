import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

const hashPasswprd = async (password)=>{
 const hashedPassword = await hash(password,12)
 return hashedPassword
}

const verifyPassword = async (password , hashedPassword)=>{
    const isValidPassword =await compare(password , hashedPassword)
    return isValidPassword
}

const generateAccessToken =(data)=>{
  const token =  sign({...data} ,process.env.AccessTokenPrivateKey , {
    expiresIn:"1h"
  })
return token
}

const verifyAccessToken = (token)=>{
    try {
        const tokenPayload = verify(token ,process.env.AccessTokenPrivateKey)
  return tokenPayload 
    } catch (error) {
        console.log('verifyAccessToken error' , error);
        return false
    }
}

const generateRefreshToken =(data)=>{
    const token =  sign({...data} ,process.env.RefreshTokenPrivateKey , {
        expiresIn:"15d"
    })
    return token
}

const verifyRefreshToken = (token)=>{
   try {
    const payload = verify(
        token,
        process.env.RefreshTokenPrivateKey
    )
    return payload
   } catch (error) {
    return false
   }
}



const validateEmail = (email)=>{
    const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/g
return pattern.test(email)
}
const validatePhone = (phone)=>{
    const pattern = /^(?:\+98|0)?9\d{9}$/g
return pattern.test(phone)
}
const validatePassword = (password)=>{
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+^()\-_=])[A-Za-z\d@$!%*?&#+^()\-_=]{8,}$/g
    return pattern.test(password)
}





export {hashPasswprd , verifyPassword , generateAccessToken , verifyAccessToken , generateRefreshToken ,validateEmail,
validatePhone,
validatePassword ,verifyRefreshToken}