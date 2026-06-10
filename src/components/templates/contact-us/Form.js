"use client";
import { useState } from "react";
import styles from "./form.module.css";
import { showSwal } from "@/utils/helper";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const submitMessage = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, company, message }),
    });
    if (res.status === 201) {
      showSwal("درخواست تماس ثبت شد", "success", "OK");
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setMessage("");
    }
  };

  return (
    <form className={styles.form}>
      <span>فرم تماس با ما</span>
      <p>برای تماس با ما می توانید فرم زیر را تکمیل کنید</p>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>نام و نام خانوادگی</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </div>
        <div className={styles.group}>
          <label>آدرس ایمیل</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>شماره تماس</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
          />
        </div>
        <div className={styles.group}>
          <label>نام شرکت</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <div className={styles.group}>
        <label>درخواست شما</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="3"
        ></textarea>
      </div>
      <button onClick={submitMessage}>ارسال</button>
    </form>
  );
};

export default Form;
