"use client"
import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import { showSwal } from "@/utils/helper";
import { validateEmail, validatePassword } from "@/utils/auth";
import { useRouter } from "next/navigation";

const Login = ({showRegisterForm}) => {
  
  const [phoneOrEmail , setPhoneOrEmail] =useState("")
  const [password , setPassword] =useState("")
  const [isLoginWithOtp , setIsLoginWithOtp]= useState(false)
  const router = useRouter()
  const hideOtp =()=> setIsLoginWithOtp(false)

  const signInWithPassword =async()=>{
    if(!phoneOrEmail || !password){
      showSwal("مقادیر را وارد کنید", "error" , "تلاش مجدد")
    }
     const isValidEmail =validateEmail(phoneOrEmail)
     if(!isValidEmail){
       showSwal("ایمیل نامعتبر", "error" , "تلاش مجدد")
     }
     const isValidPassword =validatePassword(password)
     if(!isValidPassword){
       showSwal("پسورد نامعتبر", "error" , "تلاش مجدد")
     }

  const res = await fetch("/api/auth/signin",{
    method:"POST" ,
    headers:{
     "Content-Type" :"application/json"
    },
    body:JSON.stringify({email:phoneOrEmail , password})
  })
  const data =await res.json()
 
 
  
 if(res.status ===200){
  setPhoneOrEmail("")
setPassword("")

    if(data.user.role==="ADMIN"){
      router.replace("/p-admin")
    }else{
      router.replace("/p-user")
    }
  



 }else if(res.status ===422 || res.status ===401){
  showSwal("کاربری با این اطلاعات یافت نشد" ,"error" ,"تلاش مجدد")
 }

}


  return (
    <>
      {!isLoginWithOtp ? (
        <>
      <div className={styles.form}>
        <input
        value={phoneOrEmail}
        onChange={(e)=> setPhoneOrEmail(e.target.value)}
          className={styles.input}
          type="text"
          placeholder="ایمیل/شماره موبایل"
          
        />
        <input
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
          className={styles.input}
          type="password"
          placeholder="رمز عبور"
          
        />
        <div className={styles.checkbox}>
          <input type="checkbox" name="" id="" />
          <p>مرا به یاد داشته باش</p>
        </div>
        <button
        onClick={signInWithPassword}
        className={styles.btn}>ورود</button>
        <Link href={"/forget-password"} className={styles.forgot_pass}>
          رمز عبور را فراموش کرده اید؟
        </Link>
        <button onClick={()=> setIsLoginWithOtp(true)} className={styles.btn}>ورود با کد یکبار مصرف</button>
        <span>ایا حساب کاربری ندارید؟</span>
        <button
        onClick={showRegisterForm}
        className={styles.btn_light}>ثبت نام</button>
      </div>
       <Link href={"/"} className={styles.redirect_to_home}>
        لغو
      </Link>
      </>
      )
    :
    (<Sms hideOtp={hideOtp}/>)
    }
     

    </>
  );
};

export default Login;
