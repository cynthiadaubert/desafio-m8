import React, {useState} from "react";
import css from "./index.css";
import {Link, useNavigate} from "react-router-dom"
import {useCreateUserId} from "hooks/hooks"

export function RegisterForm(){
const {getId} = useCreateUserId()
 const navigate = useNavigate()
 const [authError,setAuthError] = useState(false)


 const handleFormSubmit = async (e) => {
  e.preventDefault()
  const email = e.target.email.value
  const pass = e.target.pass.value
  const password = e.target.password.value
  if (pass === password){
  try {
      const res = await getId (email,pass)
      if (res){
      console.log("registrado con éxito")
      navigate("/login")
      } else{
      setAuthError(true)
      }
  
    } catch (error) {
    console.log(error)
    return [] 
    }
  }else{
  setAuthError(true)
  }
}

   return (<div>
   <form className={css.form} onSubmit={handleFormSubmit}>
    <label className={css.email} htmlFor="">EMAIL</label>
    <input className={css.inp} name="email" type="email" />
    <label className={css.pass} htmlFor="">CONTRASEÑA</label>
    <input className={css.inp} name="password" type="password" />
    <label className={css.pass2} htmlFor="">REPETIR CONTRASEÑA</label>
    <input className={css.inp} name="pass" type="password" />
    {authError &&  <h3 className={css.alert} >Usuario o contraseña incorrectos, por favor, inténtelo de nuevo.</h3>}
    <button className={css.btn}>Siguiente</button>
   </form>
   </div>
   )
}