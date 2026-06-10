"use client";
import React, { useState } from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";


export default function DataTable({ users, title }) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter()

  const openEditModal = (user) => {
    setName(user.name);
    setEmail(user.email);
    setSelectedUser(user);
    setIsShowModal(true);
  
  }


  const handleSaveChange = async()=>{
    if(!selectedUser)return
    const res = await fetch(`/api/users/${selectedUser._id}`,{
      method:"PUT",
      headers:{
        "Content-Type" :"application/json"
      },
      body:JSON.stringify({name, email})
    })
    const data = await res.json()
    if(res.status===200){
      setIsShowModal(false)
      window.location.reload()
    }
    }

    const handleChangeRole =async(userID)=>{
     
      
    const res = await fetch("/api/user/role",{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({id:userID})
    })
    const data = await res.json()
    if(res.status===200){
      swal({
        title:"نقش کاربر تغییر یافت",
        icon:"success",
        buttons:"OK"
      })
    router.refresh()
    }
    
    }


    const handleDeleteUser= async(userID)=>{
      swal({
        title:"آیا از حذف کاربر اطمینان دارید؟",
        icon:"warning",
        buttons:["خیر" ,"بله"]
      }).then(async(result)=>{
        if(result){
           const res= await fetch("/api/user",{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({id:userID})
      })
      if(res.status===200){
      swal({
        title:"کاربر حذف شد",
        icon:"success",
        buttons:"OK"
      })
    router.refresh()
    }
        }
      })
   }


    const handleBanUser= async(phone , email)=>{
      swal({
        title:"آیا از بن کاربر اطمینان دارید؟",
        icon:"warning",
        buttons:["خیر" ,"بله"]
      }).then(async(result)=>{
        if(result){
           const res= await fetch("/api/user/ban",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({phone , email})
      })
      if(res.status===200){
      swal({
        title:"کاربر بن شد",
        icon:"success",
        buttons:"OK"
      })
    router.refresh()
    }
        }
      })
   }

  return (
    <div>
      {isShowModal && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <h2>ویرایش کاربر</h2>

            <div className={styles.form_group}>
              <label>نام</label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.form_group}>
              <label>ایمیل</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button onClick={() => setIsShowModal(false)}>بستن</button>

            <button
            onClick={handleSaveChange}
            type="button" className={styles.save_btn}>
              ذخیره تغییرات
            </button>
          </div>
        </div>
      )}
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>تغییر سطح</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email ? user.email : "ایمیل یافت نشد"}</td>
                <td>{user.role === "USER" ? "کاربر عادی" : "مدیر"}</td>
                <td>
                  <button
                    onClick={() => openEditModal(user)}
                    type="button"
                    className={styles.edit_btn}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                  onClick={()=>handleChangeRole(user._id)}
                  type="button" className={styles.edit_btn}>
                    تغییر نقش
                  </button>
                </td>
                <td>
                  <button
                  onClick={()=> handleDeleteUser(user._id)}
                  type="button" className={styles.delete_btn}>
                    حذف
                  </button>
                </td>
                <td>
                  <button
                  onClick={()=> handleBanUser(user.email, user.phone)}
                  type="button" className={styles.delete_btn}>
                    بن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
