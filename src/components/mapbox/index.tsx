import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import css from "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";
import {useParams} from "react-router-dom"
import { getPetData } from 'hooks/api';
mapboxgl.accessToken = "pk.eyJ1IjoibWFyY29zcmV1cXVlbiIsImEiOiJja3UxbXBzbHQzejJvMnBwcW4yN3pqemZuIn0.z65srWhOb5sS3GilPljOpw"

export function Mapbox(){
  const params = useParams();
  const petId = params.id ? params.id : 24;
  const [marker, setMarker] = useState(null);
  const [location, setLocation] = useState({ latitude: -34.6037345, longitude: -58.3841507 } )

   useEffect(()=>{
    async function fetchData() {
      try {
        const res = await getPetData(petId);
        const data = [res[0].pictureURL, res[0].name, res[0].lat, res[0].lng];
         setLocation({
          latitude: data[2],
          longitude: data[3]
        }) 
      } catch (error) {
        console.error('Error fetching pet data:', error);
      }
    }
  
    fetchData();
  
  }, []) 

  const mapContainer = useRef(null);
  const map = useRef(null);
  
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [location.longitude, location.latitude],
      zoom: 12,
    });
    // Clean up resources when the component unmounts
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [location]);

  useEffect(() => {
    // Add a marker
    const newMarker = new mapboxgl.Marker()
      .setLngLat([location.longitude, location.latitude])
      .addTo(map.current);
  
    setMarker(newMarker);
  }, [location]);

     // Handle the input change and update the marker location
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    // Use a geocoding service to convert the input value to coordinates
    // Update the marker and location state accordingly
    // For simplicity, you can use the Mapbox Geocoding API or any other geocoding service

    // Example using Mapbox Geocoding API (Note: Replace YOUR_ACCESS_TOKEN with your actual access token)
    const geocodingEndpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?access_token=${mapboxgl.accessToken}`;
    
    fetch(geocodingEndpoint)
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;

          // Update marker and location state
          if (marker) {
            marker.setLngLat([lng, lat]);
          } else {
            const newMarker = new mapboxgl.Marker()
              .setLngLat([lng, lat])
              .addTo(map.current);
            setMarker(newMarker);
          }
          setLocation({latitude: lat, longitude: lng});
          const geodata = JSON.stringify({latitude: lat, longitude: lng})
          localStorage.setItem("petLocation",geodata)
        }
      })
      .catch((error) => {
        console.error('Error fetching geocoding data:', error);
      });
  };

    return (
        <div className={css.root}>
                <div className={css.map} style={{ height: '400px' }} ref={mapContainer}></div>
                  <p className={css.subtitle}>Ingresá un punto de referencia para reportar la mascota. Por ejemplo, la ubicación donde lo viste por última vez.</p>

                  <label className={css.label}>UBICACIÓN</label>
                  <input type="search"  className={css.text_input} onChange={handleInputChange} name="location" placeholder= "Ej: &quot;Monumento a la bandera, Rosario&quot;" required={true}/>
        </div>
    )
}



