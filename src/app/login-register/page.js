"use client";
import { useState } from 'react';
import styles from '../../styles/login-register.module.css';
import { authTypes } from '@/utils/constants';
import Login from '@/components/templates/login-register/Login';
import Register from '@/components/templates/login-register/Register';


const LoginRegister = () => {

  const [authType , setAuthType] = useState(authTypes.LOGIN)

  const showLoginForm =()=> setAuthType(authTypes.LOGIN)
  const showRegisterForm =()=> setAuthType(authTypes.REGISTER)

  return (
    <div className={styles.login_register}>
      <div className={styles.form_bg} data-aos="fade-up">
        {authType === authTypes.LOGIN ?
        <Login showRegisterForm={showRegisterForm}/>
        :
        <Register showLoginForm={showLoginForm}/>
        }
      </div>
      <section>
        <img
          src="https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg"
          alt=""
        />
      </section>
    </div>
  );
};

export default LoginRegister;
