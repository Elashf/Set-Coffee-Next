"use client"
import { showSwal } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { GiReturnArrow } from "react-icons/gi";

function AddToWishlist({productID}) {

    const [user , setUser] = useState({})

  useEffect(()=>{
    const authUser = async()=>{
      const res = await fetch("/api/auth/me")

      if(res.status===200){
      const data= await res.json()
      setUser({...data})
      }
      

    }
    authUser()
  },[])


    const addToWishlist =async (e)=>{
      e.preventDefault()
      if(!user?._id){
       return showSwal("ابتدا در سایت لاگین کنید" , "error" , "ok")
      }

      const wish = {
        user: user._id ,product: productID
      }
      
 const res = await fetch("/api/wishlist",{
        method:"POST" , 
        headers:{
          "Content-Type": "application/json"
        } ,
        body: JSON.stringify(wish)
      }) 
      if(res.status===201){
        showSwal("محصول به علاقه مندی ها اضافه شد" , "success" ,"ok")
      }

    }


  return (
    <div onClick={addToWishlist}>
      <CiHeart />
      <a href="">افزودن به علاقه مندی ها</a>
    </div>
  );
}

export default AddToWishlist;

