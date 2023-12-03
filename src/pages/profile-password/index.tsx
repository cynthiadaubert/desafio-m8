import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom"
import { Header } from "../../components/header";
import { PasswordForm } from "components/passwordForm";
import css from "./index.css";


export function ProfilePassword() {
  
  return (<div>
    <Header></Header>
  <div className={css.root}>
    
    <h1 className={css.title}>Contraseña</h1>
      <PasswordForm></PasswordForm>
</div>

  </div>)
}

