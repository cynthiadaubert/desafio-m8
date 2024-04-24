import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom"
import { Header } from "../../components/header";
import { GeolocButton } from "../../ul/geolocButton";
import css from "./index.css";

import img from "../../public/beach_day.png"


function Home() {
  
  return (
    <div>
    <Header></Header>
  <div className={css.root}>
    <img className={css.beach} src={img}/>
          <h1 className={css.title}>Pet Finder App</h1>
          <p className={css.subtitle}> Encontrá y reportá mascotas perdidas cerca de tu ubicación</p>
          <Link to="/pets"><GeolocButton></GeolocButton></Link>
  </div>
  </div>)
}

export {Home};