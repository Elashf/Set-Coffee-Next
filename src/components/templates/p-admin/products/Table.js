"use client";
import React, { useState } from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helper";
import Link from "next/link";


export default function DataTable({ products, title }) {
  const router = useRouter();
  const [isEditOpenModal,setIsEditOpenModal] =useState(false)
  const [selectedProduct,setSelectedProduct] =useState(null)
const[ name , setName]=useState("")
const[ price , setPrice]=useState("")


  const openEditModal = (product)=>{
    setName(product.name)
    setPrice(product.price)
    setIsEditOpenModal(true)
    setSelectedProduct(product)
  }

  const handleChange =async(id)=>{
const res = await fetch("/api/products/editProduct",{
  method:"PUT",
  headers:{
    "Content-Type": "application/json"
  },
  body:JSON.stringify({id,name , price})
})
if(res.ok){
  router.refresh()
  setIsEditOpenModal(false)
  showSwal("محصول با موفقیت تغییر یافت" ,"success","OK")
}
  }

  const handleDelete =async(id)=>{
   const res = await fetch("/api/products/deleteProduct",{
    method:"DELETE",
     headers:{
    "Content-Type": "application/json"
  },
  body:JSON.stringify({id})
   })
   if(res.ok){
  router.refresh()
  setIsEditOpenModal(false)
  showSwal("محصول با موفقیت  حدف شد" ,"success","OK")
}
  }

  return (
    <div>
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
              <th>نام</th>
              <th>قیمت</th>
              <th>امتیاز</th>
             
              <th> مشاهده جزییات</th>
              <th>ویرایش</th>
              <th>حذف</th>
              
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()}</td>
                <td>{product.score}</td>
                
                <td>
                  <Link href={`/product/${product._id}`}
                    type="button"
                    className={styles.edit_btn}
                    
                  >
                    مشاهده
                  </Link>
                </td>
                <td>
                  <button
                  onClick={()=>openEditModal(product)}
                  type="button" className={styles.edit_btn}>
                    ویرایش
                  </button>
                 
                </td>
                <td>
                  <button onClick={()=>handleDelete(product._id)} type="button" className={styles.delete_btn}>
                    حذف
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       {isEditOpenModal && (
                    <div className={styles.modal}>
                        <div className={styles.modal_content}>
                            <h3>ویرایش محصول</h3>
                            <input
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                            type="text"
                            placeholder="نام محصول" />
                            <br/>
                            <input
                            value={price}
                            onChange={(e)=> setPrice(e.target.value)}
                            type="text"
                            placeholder="قیمت محصول" />
                            <br/>
                            <button onClick={()=>handleChange(selectedProduct._id)}>اعمال تغییر</button>
                            <br/>
                            <button onClick={()=>setIsEditOpenModal(false)}>بستن</button>
                        </div>
                    </div>
                  )}
    </div>
    
  );
}
