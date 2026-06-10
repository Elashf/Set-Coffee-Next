"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helper";


export default function DataTable({ comments, title }) {
  const router = useRouter();

  const showCommentBody = (body) => {
    showSwal(body, undefined, "خوندم");
  };


  const rejectComment = async (commentID)=>{
    const res = await fetch("/api/comment/reject",{
     method:"PUT" ,
     headers:{
      "Content-Type": "application/json"
     }, 
     body: JSON.stringify({id: commentID})
    })
    if(res.status ===200){
      router.refresh()
    }
  }


  const acceptComment = async (commentID)=>{
    const res = await fetch("/api/comment/accept",{
     method:"PUT" ,
     headers:{
      "Content-Type": "application/json"
     }, 
     body: JSON.stringify({id: commentID})
    })
    if(res.status ===200){
      router.refresh()
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
              <th>کاربر</th>
              <th>ایمیل</th>
              <th>امتیاز</th>
              <th>محصول</th>
              <th>تاریخ ثبت</th>
              <th>مشاهده</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>تایید / رد</th>
              <th>پاسخ</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={comment._id}>
                <td className={comment.isAccept ? styles.accept : styles.reject}>{index + 1}</td>
                <td>{comment.username}</td>
                <td>{comment.email}</td>
                <td>{comment.score}</td>
                <td>{comment.productID.name}</td>
                <td>{new Date(comment.date).toLocaleDateString("fa-IR")}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => showCommentBody(comment.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.edit_btn}>
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    حذف
                  </button>
                </td>
                <td>
                   {comment.isAccept ?
                    <button
                    onClick={()=>rejectComment(comment._id)}
                    type="button" className={styles.delete_btn}>
                   رد
                  </button>
                   : <button
                   onClick={()=>acceptComment(comment._id)}
                   type="button" className={styles.delete_btn}>
                   تایید
                  </button>
                   }
                  
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    پاسخ
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
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
