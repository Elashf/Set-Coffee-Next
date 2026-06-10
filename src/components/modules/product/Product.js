"use client"
import Link from "next/link";
import styles from "./product.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";

const Card = ({_id ,img,name , price}) => {

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
        <button>افزودن به سبد خرید</button>
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
