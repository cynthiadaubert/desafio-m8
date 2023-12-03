import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom"
import { Header } from "../../components/header";
import { PersonalDataForm } from "components/personalDataForm";
import css from "./index.css";


export function ProfileAccount() {
  
  return (
    <div><Header></Header>
  <div className={css.root}>
  
    
    <h1 className={css.title}>Datos personales</h1>
    <PersonalDataForm></PersonalDataForm>
          
  </div>
  </div>)
}

