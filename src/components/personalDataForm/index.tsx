import React, { useState } from "react";
import { updateUserData } from "hooks/api";
import css from "./index.css";



export function PersonalDataForm(){
  const [alert,setAlert] = useState(false)
  const userId= localStorage.getItem("userId")

 const handleFormSubmit = async (e) => {
  e.preventDefault()
  const name = e.target.nombre.value
  const location = e.target.geoloc.value

  const data = {name,location}

   try {
      const res = await updateUserData (data, userId)
      if (res){
      setAlert(true)
      console.log("dsd7f",res)
      }
  
    } catch (error) {
    console.log(error)
    return [] 
    }  
 
}

   return (<div>
   <form className={css.form} onSubmit={handleFormSubmit}>
    <label className={css.name} htmlFor="">NOMBRE</label>
    <input className={css.inp} name="nombre" type="text" />
    <label className={css.name} htmlFor="">LOCALIDAD</label>
    <input className={css.inp} name="geoloc" type="text" />
    {alert &&  <h3 className={css.alert} >Los datos han sido actualizados.</h3>}
    <button className={css.btn}>Guardar</button>
 
   </form>
   </div>
   )
}