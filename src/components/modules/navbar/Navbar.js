"use client"

import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";

function Navbar({isLogin}) {

  const [fixTop , setFixTop] = useState(false)
  const [wishCount , setWishCount] = useState(0)
  const [cartCount , setCartCount]= useState(0)

  useEffect(()=>{
    const cart =JSON.parse(localStorage.getItem("cart") || []) 
    setCartCount(cart.length)
  },[])

  useEffect(()=>{
const getWishCount = async()=>{
  const res = await fetch("/api/wishlist")
  const data = await res.json()
  
  setWishCount(data.wishlist.length)
  
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
            <Link href="/category">فروشگاه</Link>
          </li>
          <li>
            <Link href="/blog">وبلاگ</Link>
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
            <span>{wishCount}</span>
          </Link>
          
        </div>
      </main>
    </nav>
  );
}

export default Navbar;
