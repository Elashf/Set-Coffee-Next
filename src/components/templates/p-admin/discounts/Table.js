"use client"
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";

function Table({ discounts }) {

  const router = useRouter()
  const deleteDiscount =async(id)=>{
    const res = await fetch("/api/discounts/deleteDiscount", {
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id})
    })
    if(res.status===200){
      router.refresh()
    }
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>شناسه</th>
          <th>کد</th>
          <th>درصد</th>
          <th>حداکثر استفاده</th>
          <th>دفعات استفاده شده</th>
          <th>حذف</th>
        </tr>
      </thead>
      <tbody>
        {discounts.map((discount, index) => (
          <tr key={discount._id}>
            <td className={discount.maxUse === discount.uses ? styles.red : styles.green}>{index + 1}</td>
            <td>{discount.code}</td>
            <td>{discount.percent}</td>
            <td>{discount.maxUse}</td>
            <td>{discount.uses}</td>
            <td>
              <button
              onClick={()=>deleteDiscount(discount._id)} type="button" className={styles.delete_btn}>
                حذف
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
