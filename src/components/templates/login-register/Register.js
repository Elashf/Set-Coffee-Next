"use client";
import { useState } from "react";
import styles from "./register.module.css";
import Sms from "./Sms";
import swal from "sweetalert";
import { showSwal } from "@/utils/helper";
import { validateEmail, validatePassword, validatePhone } from "@/utils/auth";

const Register = ({ showLoginForm }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);
  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);

  const hideOtp = () => setIsRegisterWithOtp(false);

  const signUp = async () => {

    if(!name){
      return showSwal("نام را وارد کنید" , "error" , "تلاش مجدد")
    }

    const isValidPhone = validatePhone(phone)
    if(!isValidPhone){
       return showSwal("شماره تماس معتبر نمیباشد" , "error" , "تلاش مجدد")
    }
   if(email){
    const isValidEmail = validateEmail(email)
    if(!isValidEmail){
       return showSwal("ایمیل معتبر نمیباشد" , "error" , "تلاش مجدد")
    }}
 
    const isValidPassword = validatePassword(password)
    if(!isValidPassword){
       return showSwal("رمز عبور معتبر نمیباشد" , "error" , "تلاش مجدد")
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, email, password }),
    });
    console.log(res);
    if(res.status ===201){
      setName("")
setPhone("")
setEmail("")
setPassword("")
      showSwal("ثبت نام با موفقیت انجام شد" , "success" , "ورود به پنل کاربری")
    }else{
       showSwal("کاربر از قبل وجود دارد" ,"error" ,"تلاش مجدد")
    }
  };

  return (
    <>
      {!isRegisterWithOtp ? (
        <>
          <div className={styles.form}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              type="text"
              placeholder="نام"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
              type="text"
              placeholder="شماره موبایل  "
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              type="email"
              placeholder="ایمیل (دلخواه)"
            />
            {isRegisterWithPass && (
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                type="password"
                placeholder="رمز عبور"
              />
            )}

            <p
              onClick={() => setIsRegisterWithOtp(true)}
              style={{ marginTop: "1rem" }}
              className={styles.btn}
            >
              ثبت نام با کد تایید
            </p>
            <button
              onClick={() => {
                if (isRegisterWithPass) {
                  signUp();
                } else {
                  setIsRegisterWithPass(true);
                }
              }}
              style={{ marginTop: ".7rem" }}
              className={styles.btn}
            >
              ثبت نام با رمزعبور
            </button>
            <p onClick={showLoginForm} className={styles.back_to_login}>
              برگشت به ورود
            </p>
          </div>
          <p className={styles.redirect_to_home}>لغو</p>
        </>
      ) : (
        <Sms hideOtp={hideOtp} />
      )}
    </>
  );
};

export default Register;
