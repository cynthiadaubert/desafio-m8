import React, {useEffect} from "react";
import { Header } from "../../components/header";
import { PetCardEdit } from "components/petCardEdit";
import css from "./index.css";




export function MyReports() {
  
  return (<div>
    <Header></Header>
  <div className={css.root}>
  
          <h1 className={css.title}>Mascotas reportadas</h1>
          <PetCardEdit></PetCardEdit>
    </div>
  </div>)
}




/// AGREGAR LA FUNCIÓN DE QUE SI EL USUARIO NO TIENE PETS EN SU CUENTA QUE SE CARGE "Aún no reportaste mascotas perdidas"