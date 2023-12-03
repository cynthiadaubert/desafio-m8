import React from "react";
import {Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header";
import css from "./index.css";



export function Profile() {
  const navigate = useNavigate()
  const userEmail = localStorage.getItem("userEmail")

  const logout = ()=>{
    localStorage.clear()
    navigate("/")
  }
  
  return (<div>
    <Header></Header>
  <div className={css.root}>
          <h1 className={css.title}>Mis datos</h1>
          <Link to="/profile/account"><button className={css.btn}>Modificar datos personales</button></Link>
          <Link to="/profile/password"><button className={css.btn}>Modificar contraseña</button></Link>
          <h1 className={css.userEmail}>{userEmail}</h1>
          <h1 className={css.logout} onClick={logout}>CERRAR SESIÓN</h1>
  </div>
  </div>)
}

