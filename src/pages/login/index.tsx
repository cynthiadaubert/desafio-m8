import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom"
import { Header } from "../../components/header";
import { LoginForm } from "components/loginForm";
import css from "./index.css";

import img from "../../public/login.png"


export function Login(){

    return (
        <div className={css.root}>
            <Header></Header>
            <img className={css.logo} src={img}/>
            <h1 className={css.title}>Iniciar sesión</h1>
            <p className={css.subtitle}>Ingresá tu email para continuar.</p>
            <LoginForm></LoginForm>
          <div className={css.text}>Aún no tenes cuenta?<Link to="/register"><div className={css.link}> Registrarse</div></Link></div>
          
          
       </div>
    )

}

