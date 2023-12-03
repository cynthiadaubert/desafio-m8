import React, {useState} from "react";
import { updateUserData } from "hooks/api";
import css from "./index.css";



export function PasswordForm(){
  const [alert,setAlert] = useState(false)
  const userId= localStorage.getItem("userId")

 const handleFormSubmit = async (e) => {
  e.preventDefault()
  const password = e.target.password.value
  const pass = e.target.pass.value

  const data = {password,pass}

  if (password === pass){
   try {
      const res = await updateUserData (data, userId)
      if (res){
      setAlert(true)
      console.log("handleform submit",res)
      }
  
    } catch (error) {
    console.log(error)
    return [] 
    }  
  }

 
}


   return (<div>
   <form className={css.form} onSubmit={handleFormSubmit}>
    <label className={css.email} htmlFor="">CONTRASEÑA NUEVA</label>
    <input className={css.inp} name="password" type="password" />
    <label className={css.pass} htmlFor="">CONFIRMAR CONTRASEÑA</label>
    <input className={css.inp} name="pass" type="password" />
    {alert &&  <h3 className={css.alert} >Los datos han sido actualizados.</h3>}
    <button className={css.btn}>Guardar</button>
 
   </form>
   </div>
   )
}