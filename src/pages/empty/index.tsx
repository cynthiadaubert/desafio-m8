import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom"
import { Header } from "../../components/header";
import css from "./index.css";

import img from "../../public/empty.png"


export function Empty() {
  
  return (
  <div className={css.root}>
  
    <Header></Header>
          <h1 className={css.title}>Mascotas reportadas</h1>
          <p className={css.subtitle}> Aún no reportaste mascotas perdidas</p>
          <img className={css.img} src={img}/>
          <Link to="/report"><button className={css.function}>Publicar reporte</button></Link>
  </div>)
}

