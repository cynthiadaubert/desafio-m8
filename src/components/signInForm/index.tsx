import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom"
import { useLogin } from "hooks/hooks";
import css from "./index.css";



export function SignInForm(){
  const {login} = useLogin() 
 const userEmail = localStorage.getItem("userEmail")
 const [email, setEmail] = useState(userEmail);
 const [authError,setAuthError] = useState(false)

 const handleInputChange = (e) => {
   // Actualizar el estado cuando el usuario escribe algo
   setEmail(e.target.value);
 };
 const navigate = useNavigate()
/*   console.log("Email en el localstorage dentro de signup:",userEmail) */

const handleFormSubmit = async (e) => {
  e.preventDefault()
  const email = e.target.email.value
  const password = e.target.password.value
try {
  const res = await login(email,password)
  if (res){
  console.log("autorizado con éxito")
 navigate("/profile")
  } else{
    setAuthError(true)
  }

} catch (error) {
  console.log(error)
  return []
}
  
}


   return (
   <div className={css.root}>
        <form className={css.form} onSubmit={handleFormSubmit}>
        <label className={css.email}>EMAIL</label>
        <input className={css.inp} value={email} onChange={handleInputChange} name="email" type="email" />
        <label className={css.pass} htmlFor="">CONTRASEÑA</label>
        <input className={css.inp} name="password" type="password" />
        {authError &&  <h3 className={css.alert} >Usuario o contraseña incorrectos, por favor, inténtelo de nuevo.</h3>}
        <button className={css.btn}>Acceder</button>
        </form>
      <div className={css.link}>Olvidé mi contraseña</div>
   </div>
   )
}