import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom"
import { Header } from "../../components/header";
import { PetCard } from "components/petCard";
import css from "./index.css";




export function HomePets() {
  
  return (
  <div className={css.root}>
  
    <Header></Header>
          <h1 className={css.title}>Mascotas perdidas cerca</h1>
          <PetCard></PetCard>
  </div>)
}

