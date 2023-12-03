import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom"
import { Header } from "../../components/header";
import { ReportEditForm } from "../../components/reportEdit";
import { ReportForm } from "components/reportForm";
import css from "./index.css";


export function ReportEdit(){
    return (<div className={css.root}>
        <Header></Header>
        <h1 className={css.title}>Editar reporte de mascota</h1>
        <ReportEditForm></ReportEditForm>
    </div>)
}