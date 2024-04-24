import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom"
import { Header } from "../../components/header";
import { PetCard } from "components/petCard";
import css from "./index.css";




export function HomePets() {

  const [location, setLocation] = React.useState(null);
  useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting geolocation:', error);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}, []);
  
  return (
  <div className={css.root}>
  
    <Header></Header>
          <h1 className={css.title}>Mascotas perdidas cerca</h1>
          <PetCard></PetCard>
  </div>)
}

