import React, {useEffect, useState} from "react";
import { useRecoilValue } from "recoil";
import { useCheckEmail } from "hooks/hooks";
import {Link, useNavigate} from "react-router-dom"
import { userEmailSelector } from "hooks/atoms";
import css from "./index.css";


export function LoginForm(){
   const userEmail = useRecoilValue(userEmailSelector)
/*    console.log("Email en el átomo:",userEmail) */
   const { setEmail, getEmail} = useCheckEmail()
   const navigate = useNavigate()
   
   const handleFormSubmit = async (e)=>{
      e.preventDefault()
      const email = e.target.email.value
      try {
       const res = await getEmail(email) 
      if (res == null){
         console.log("no existe el mail")
         alert("Su email no existe, por favor regístrese.")
         navigate("/register")
      }else{
         setEmail(email)
         console.log("el email si existe")
         navigate("/signin")
      }
      } catch (error) {
         console.log(error)
         return []
      }
   }

/*    useEffect(()=>{
      const storedEmail = localStorage.getItem("userEmail")
      if(storedEmail){
         setEmail(storedEmail)
      }
   },[]) */

   return (<div>
   <form onSubmit={handleFormSubmit} className={css.form}>
    <label className={css.email} htmlFor="">EMAIL</label>
    <input className={css.inp} name="email" type="email" />
    <button className={css.button}>Siguiente</button>
   </form>
   </div>
   )
}