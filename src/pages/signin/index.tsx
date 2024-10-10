import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom"
import { Header } from "../../components/header";
import { SignInForm } from "components/signInForm";
import { useCheckEmail } from "hooks/hooks";
import css from "./index.css";


export function SignUp(){
    return (
        <div className={css.root}>
            <Header></Header>
            <h1 className={css.title}>Iniciar sesión</h1>
            <p className={css.subtitle}>Ingresá los siguientes datos para iniciar sesión</p>
            <p className={css.credentials}> EXAMPLE USER: example123@gmail.com / PASS: 12345 </p>
            <SignInForm></SignInForm>  
       </div>
    )
}