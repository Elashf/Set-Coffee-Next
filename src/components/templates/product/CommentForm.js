import { IoMdStar } from "react-icons/io";
import styles from "./commentForm.module.css";
import { useEffect, useState } from "react";
import { showSwal } from "@/utils/helper";

const CommentForm = ({ productID }) => {
  const [body, setBody] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [score, setScore] = useState(5);
  const [isSaveUserInfo, setIsSaveUserInfo] = useState(false);

  const setCommentScore = (score) => {
    setScore(score);
  };
useEffect(()=>{
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
   setUsername(userInfo.username)
   setEmail(userInfo.email)
    },[])
  const insertComment = async () => {

    if(isSaveUserInfo){
      const userInfo={
        username, email
      }
      localStorage.setItem("userInfo" , JSON.stringify(userInfo))
    }
    

    if (!body || !username || !email) {
      showSwal("پر کردن فیلد ها ضرروری است", "error", "ok");
    }

    const res = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({body, username, email, score, productID}),
    });
    const data = res.json();
   if(res.status===201){
    showSwal("کامنت ثبت شد" ,"success" ,"ok")
   }
  };

  return (
    <div className={styles.form}>
      <p className={styles.title}>دیدگاه خود را بنویسید</p>
      <p>
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span style={{ color: "red" }}>*</span>
      </p>
      <div className={styles.rate}>
        <p>امتیاز شما :</p>
        <div>
          <IoMdStar onClick={() => setCommentScore(5)} />
          <IoMdStar onClick={() => setCommentScore(4)} />
          <IoMdStar onClick={() => setCommentScore(3)} />
          <IoMdStar onClick={() => setCommentScore(2)} />
          <IoMdStar onClick={() => setCommentScore(1)} />
        </div>
      </div>
      <div className={styles.group}>
        <label htmlFor="">
          دیدگاه شما
          <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          onChange={(e) => setBody(e.target.value)}
          value={body}
          id="comment"
          username="comment"
          cols="45"
          rows="8"
          required=""
          placeholder=""
        ></textarea>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label htmlFor="">
            نام
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="">
            ایمیل
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
          />
        </div>
      </div>
      <div className={styles.checkbox}>
        <input type="checkbox" value={isSaveUserInfo} onChange={(e)=> setIsSaveUserInfo(prevValue => !prevValue)} />
        <p>
          {" "}
          ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
          می‌نویسم.
        </p>
      </div>
      <button onClick={insertComment}>ثبت</button>
    </div>
  );
};

export default CommentForm;
