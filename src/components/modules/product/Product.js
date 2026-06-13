"use client"
import Link from "next/link";
import styles from "./product.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";
import { showSwal } from "@/utils/helper";

const Card = ({_id ,img,name , price }) => {

  const addToWish = async (productId) => {
 

  await fetch("/api/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
    }),
  });
};
 const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length) {
      const isInCart = cart.some((item) => item.id === _id);

      if (isInCart) {
        cart.forEach(item=>{
          if(item.id===_id){
            item.count+=1
          }
        })
        localStorage.setItem("cart", JSON.stringify(cart))
      }else{
         const cartItem = {
        id: _id,
        name,
        price,
        count :1,
      };
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));
      showSwal("محصول به سبد خرید اضافه شد", "success", "OK");
      }
    } else {
      const cartItem = {
        id: _id,
        name,
        price,
        count:1,
      };
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));
      showSwal("محصول به سبد خرید اضافه شد", "success", "OK");
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.details_container}>
        <img
          src={img}
          alt=""
        />
        <div className={styles.icons}>
          <Link href={`/product/${_id}`}>
            <CiSearch />
            <p className={styles.tooltip}>مشاهده سریع</p>
          </Link>
          <div>
            <CiHeart onClick={() => addToWish(_id)}/>
            <p className={styles.tooltip}>افزودن به علاقه مندی ها </p>
          </div>
        </div>
        <button onClick={addToCart}>افزودن به سبد خرید</button>
      </div>

      <div className={styles.details}>
        <Link href={"/"}>
         {name}
        </Link>
        <div>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaRegStar />
          <FaRegStar />
        </div>
        <span>{price?.toLocaleString()} تومان</span>
      </div>
    </div>
  );
};

export default Card;
