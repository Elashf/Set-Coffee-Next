"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoIosSend } from 'react-icons/io'
import styles from "@/styles/p-user/sendTicket.module.css";
import { useRouter } from 'next/navigation';

function SendTicket() {

    const [title , setTitle]= useState("")
    const [departments , setDepartments]= useState([])
    const [departmentID , setDepartmentID]= useState('')
    const [subDepartments , setSubDepartments]= useState([])
    const [subDepartmentID , setSubDepartmentID]= useState('')
    const [body , setBody]= useState("")
    const [priority , setPriority]= useState(1)
    const router = useRouter()


    useEffect(()=>{
      const getDepartments = async()=>{
        const res = await fetch("/api/departments")
        const data= await res.json()
        setDepartments([...data])
      }
      getDepartments()
      },[])


    useEffect(()=>{
      
      if(!departmentID) return ;
      
      const getSubDepartments = async()=>{
        const res = await fetch(`/api/subDepartments/sub/${departmentID}`)

        if(res.status ===200){
          const data= await res.json()
        
         setSubDepartments([...data])
        }
        
      }
      getSubDepartments()
      },[departmentID])


      const sendTicket =async ()=>{
        const ticket ={
          title,
department : departmentID,
subDepartment: subDepartmentID,
body,
priority
        }
       
        const res = await fetch("/api/tickets",{
          method:"POST" , 
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify(ticket)
        })
        if(res.status ===201){
          swal({
            title:"تیکت با موفقیت اضافه شد" ,
            icon: "success",
            buttons:"OK"
          }).then(result=>{
            router.replace("/p-user/tickets")
          })
      }
      }


  return (
    <main className={styles.container}>
        <h1 className={styles.title}>
          <span>ارسال تیکت جدید</span>
          <Link href="/p-user/tickets"> همه تیکت ها</Link>
        </h1>

        <div className={styles.content}>
          <div className={styles.group}>
            <label>دپارتمان را انتخاب کنید:</label>
            <select
            onChange={(e)=>setDepartmentID(e.target.value)}
            >
              <option value={-1}>لطفا یک مورد را انتخاب نمایید.</option>
               {departments.map((department)=>(
                <option key={department._id} value={department._id}>{department.title}</option>
               ))}
              
            </select>
          </div>
          <div className={styles.group}>
            <label>نوع تیکت را انتخاب کنید:</label>
            <select onChange={(e)=>setSubDepartmentID(e.target.value)}>
              <option value={-1}>لطفا یک مورد را انتخاب نمایید.</option>
             {subDepartments.map((subDepartment)=>(
              <option key={subDepartment._id} value={subDepartment._id}>{subDepartment.title} </option>
             ))}
              
            </select>
          </div>
          <div className={styles.group}>
            <label>عنوان تیکت را وارد کنید:</label>
            <input 
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            placeholder="عنوان..." type="text" />
          </div>
          <div className={styles.group}>
            <label>سطح اولویت تیکت را انتخاب کنید:</label>
            <select value={priority}
            onChange={(e)=>setPriority(e.target.value)}
            >
              <option value={-1}>لطفا یک مورد را انتخاب نمایید.</option>
              <option value={1}>کم</option>
              <option value={2}>متوسط</option>
              <option value={3}>بالا</option>
            </select>
          </div>
        </div>
        <div className={styles.group}>
          <label>محتوای تیکت را وارد نمایید:</label>
          <textarea
          value={body}
          onChange={(e)=>setBody(e.target.value)}
          rows={10}></textarea>
        </div>
        <div className={styles.uploader}>
          <span>حداکثر اندازه: 6 مگابایت</span>
          <span>فرمت‌های مجاز: jpg, png.jpeg, rar, zip</span>
          <input type="file" />
        </div>

        <button onClick={sendTicket} className={styles.btn}>
          <IoIosSend />
          ارسال تیکت
        </button>
      </main>
  )
}

export default SendTicket