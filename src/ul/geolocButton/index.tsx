import React from "react";
import css from "./index.css";
import { useGeolocation } from "hooks/hooks";

//LA LÓGICA QUEDA DENTRO DE LOS HOOKS, NO DE LOS COMPONENTES

export function GeolocButton(){

    const {location,error,getLocation} = useGeolocation()
    
   return (<div>

    <button onClick={getLocation}  className={css.button}>Dar mi ubicación actual</button>

   </div>
  
   )

}