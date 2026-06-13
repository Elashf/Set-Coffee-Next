"use client"

import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";

function Navbar() {

  const [fixTop , setFixTop] = useState(false)
  const [wishCount , setWishCount] = useState(0)
  const [cartCount , setCartCount]= useState(0)
  const [isLogin, setIsLogin] = useState(false)

 

  useEffect(()=>{
    const cart =JSON.parse(localStorage.getItem("cart") || "[]") 
    setCartCount(cart.length)
  },[])

  useEffect(()=>{
const getWishCount = async()=>{
 try {
  const res = await fetch("/api/wishlist")
  if (!res.ok) return
  const data = await res.json()
  setWishCount(data?.wishlist?.length || 0)
} catch {
  setWishCount(0)
}
}
getWishCount()
  },[])



  useEffect(()=>{

    const fixNavbarToTop = ()=>{

      const currentScroll = window.pageYOffset
    if(currentScroll >105){
      setFixTop(true)
    }else{
      setFixTop(false)
    }
    
}

    window.addEventListener("scroll" , fixNavbarToTop)

    return ()=> window.removeEventListener("scroll" , fixNavbarToTop)
  },[])


  useEffect(() => {
  const checkUser = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
  cache: "no-store"
})
      const data = await res.json()


      setIsLogin(!!data.user)
    } catch {
      setIsLogin(false)
    }
  }

  checkUser()
}, [])


  return (
    <nav className={fixTop ? styles.navbar_fixed : styles.navbar}>
      <main>
        <div>
          <Link href="/">
            <img src="/images/logo.png" alt="logo" />
          </Link>
        </div>
        <ul className={styles.links}>
          <li>
            <Link href="/">صفحه اصلی</Link>
          </li>
          <li>
            <Link href="/">فروشگاه</Link>
          </li>
         
          <li>
            <Link href="/contact-us">تماس با ما</Link>
          </li>
          <li>
            <Link href="/about">درباره ما</Link>
          </li>
          <li>
            <Link href="/rules">قوانین</Link>
          </li>
          {!isLogin ? ( <li>
            <Link href="/login-register">ورود/عضویت</Link>
          </li>) : (<div className={styles.dropdown}>
            <Link href="/p-user">
              <IoIosArrowDown className={styles.dropdown_icons} />
              حساب کاربری
            </Link>
            <div className={styles.dropdown_content}>
              <Link href="/p-user/orders">سفارشات</Link>
              <Link href="/p-user/tickets">تیکت های پشتیبانی</Link>
              <Link href="/p-user/comments">کامنت ها</Link>
              <Link href="/wishlist">علاقه مندی ها</Link>
              <Link href="/p-user/account-details">جزییات اکانت</Link>
            </div>
          </div>)}
         

          
          
          
          {/*finish my-account section*/}
        </ul>
        <div className={styles.navbar_icons}>
          <Link href="/cart">
            <FaShoppingCart />
            <span>{cartCount}</span>
          </Link>
          <Link href="/wishlist">
            <FaRegHeart />
           
          </Link>
          
        </div>
      </main>
    </nav>
  );
}

export default Navbar;
