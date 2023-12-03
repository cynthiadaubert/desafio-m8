
import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom"
import { Header } from "../../components/header";
import { ReportForm } from "components/reportForm";
import css from "./index.css";


export function Reports(){
    return (<div className={css.root}>
        <Header></Header>
        <h1 className={css.title}>Reportar mascota</h1>
        <p className={css.text}>Ingresá la siguiente información para realizar el reporte de la mascota</p>
        <ReportForm></ReportForm>

    </div>)
}