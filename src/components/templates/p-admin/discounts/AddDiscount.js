"use client"
import React, { useState } from 'react'
import styles from "@/components/templates/p-admin/discounts/table.module.css";
import { useRouter } from 'next/navigation';

function AddDiscount() {
    const [code , setCode] = useState("")
    const [percent , setPercent] = useState("")
const [maxUse , setMaxUse] = useState("")
const router = useRouter()

const addDiscount = async()=>{
    const res = await fetch("/api/discounts",{
        method:"POST",
        headers:{
            "Content-Type" :"application/json"
        },
        body: JSON.stringify({code , percent , maxUse})
    })
    if(res.status===201){
        setCode("")
setPercent("")
setMaxUse("")
      router.refresh()
    }
}


  return (
    <section className={styles.discount}>
              <p>افزودن کد تخفیف جدید</p>
              <div className={styles.discount_main}>
                <div>
                  <label>شناسه تخفیف</label>
                  <input
                  value={code}
                  onChange={(e)=>setCode(e. target.value)}
                  placeholder="لطفا شناسه تخفیف را وارد کنید" type="text" />
                </div>
                <div>
                  <label>درصد تخفیف</label>
                  <input
                  value={percent}
                  onChange={(e)=>setPercent(e. target.value)}
                  placeholder="لطفا درصد تخفیف را وارد کنید" type="text" />
                </div>
                <div>
                  <label>حداکثر استفاده</label>
                  <input
                  value={maxUse}
                  onChange={(e)=>setMaxUse(e. target.value)}
                  placeholder="حداکثر استفاده از کد تخفیف" type="text" />
                </div>
                <div>
                  <label>محصول</label>
                  <select name="" id="">
                    <option value="">قهوه ترک</option>
                    <option value="">قهوه عربیکا</option>
                    <option value="">قهوه اسپرسو</option>
                  </select>
                </div>
              </div>
              <button
              onClick={addDiscount}
              >افزودن</button>
            </section>
    
  )
}

export default AddDiscount