"use client";
import Link from "next/link";
import styles from "./table.module.css";
import totalStyles from "./totals.module.css";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import stateData from "@/utils/stateData";
import Select from "react-select";

const stateOptions = stateData();

const   Table = () => {
  const [cart, setCart] = useState([]);
  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [changeAddress, setChangeAddress] = useState(false);
  const [ discount , setDiscount] = useState("")
  const [ totalPrice , setTotalPrice] = useState(0)
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(localCart);
    
  }, []);




  useEffect(()=>{
     let price = 0;

if (cart.length) {
      price = cart.reduce(
        (prev, current) => prev + Number(current.price || 0) * Number(current.count || 1),
        0,
      );
      
    }
setTotalPrice(price)
  },[cart])
   


  

  const increaseCount =(id)=>{
    const updatedCart = cart.map(item=> item.id ===id ?
      {...item , count: item.count +1} : item
    )
    setCart(updatedCart)
    localStorage.setItem("cart" , JSON.stringify(updatedCart))
  }

  const decreaseCount =(id)=>{
    const updatedCart = cart.map(item=> item.id ===id ?
    {...item , count : item.count -1} : item
  ).filter(item=> item.count >0)
  setCart(updatedCart)
   localStorage.setItem("cart" , JSON.stringify(updatedCart))
  }

  const checkDiscount =async ()=>{
   const res =await fetch("/api/discounts/uses",{
    method:"PUT" ,
    headers:{
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({code:discount})
   })
   if(res.status===200){
    const discountCode = await res.json()
    const newPrice= totalPrice - (totalPrice* discountCode.percent)/100
    setTotalPrice(newPrice)
   }
  }

  return (
    <>
      {" "}
      <div className={styles.tabel_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th> جمع جزء</th>
              <th>تعداد</th>
              <th>قیمت</th>
              <th>محصول</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{(item.count * item.price).toLocaleString()} تومان</td>
                <td className={styles.counter}>
                  <div>
                    <span onClick={()=> decreaseCount(item.id)}>-</span>
                    <p>{item.count}</p>
                    <span onClick={()=>increaseCount(item.id)}>+</span>
                  </div>
                </td>
                <td className={styles.price}>
                  {item.price.toLocaleString()} تومان
                </td>
                <td className={styles.product}>
                  <img
                    src={item.img}
                    alt=""
                  />
                  <Link href={"/"}>{item.name}</Link>
                </td>

                <td>
                  <IoMdClose className={styles.delete_icon} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <section>
          <button className={styles.update_btn}> بروزرسانی سبد خرید</button>
          <div>
            <button onClick={checkDiscount} className={styles.set_off_btn}>اعمال کوپن</button>
            <input value={discount} onChange={(e)=> setDiscount(e.target.value)} type="text" placeholder="کد تخفیف" />
          </div>
        </section>
      </div>
      <div className={totalStyles.totals}>
        <p className={totalStyles.totals_title}>جمع کل سبد خرید</p>

        <div className={totalStyles.subtotal}>
          <p>جمع جزء </p>
          <p>205,000 تومان</p>
        </div>

        <p className={totalStyles.motor}>
          {" "}
          پیک موتوری: <strong> 30,000 </strong>
        </p>
        <div className={totalStyles.address}>
          <p>حمل و نقل </p>
          <span>حمل و نقل به تهران (فقط شهر تهران).</span>
        </div>
        <p
          onClick={() => setChangeAddress((prev) => !prev)}
          className={totalStyles.change_address}
        >
          تغییر آدرس
        </p>
        {changeAddress && (
          <div className={totalStyles.address_details}>
            <Select
              defaultValue={stateSelectedOption}
              onChange={setStateSelectedOption}
              isClearable={true}
              placeholder={"استان"}
              isRtl={true}
              isSearchable={true}
              options={stateOptions}
            />
            <input type="text" placeholder="شهر" />
            <input type="number" placeholder="کد پستی" />
            <button onClick={() => setChangeAddress(false)}>بروزرسانی</button>
          </div>
        )}

        <div className={totalStyles.total}>
          <p>مجموع</p>
          <p>{totalPrice.toLocaleString()} تومان</p>
        </div>
        <Link href={"/checkout"}>
          <button className={totalStyles.checkout_btn}>
            ادامه جهت تصویه حساب
          </button>
        </Link>
      </div>
    </>
  );
};

export default Table;
