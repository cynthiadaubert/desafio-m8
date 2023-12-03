import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom"
import { Header } from "../../components/header";
import { RegisterForm } from "components/registerForm";
import css from "./index.css";


export function Register(){

    return (
        <div className={css.root}>
            <Header></Header>
            <h1 className={css.title}>Registrarse</h1>
            <p className={css.subtitle}>Ingresá los siguientes datos para realizar el registro</p>
            <RegisterForm></RegisterForm>

          <div className={css.text}>Ya tenés cuenta?<Link to="/login"><div className={css.link}>   Iniciar sesión.</div></Link></div>
          
       </div>
    )

}

