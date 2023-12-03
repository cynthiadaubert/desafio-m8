import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom"
import { MyDropzone } from "components/dropzone";
import { Mapbox } from "components/mapbox";
import {Link} from "react-router-dom"
import nope from "../../public/no_image.png"
import { updatePetData, reportAsFound, deleteReport, getPetData } from "hooks/api";
import css from "./index.css";


export function ReportEditForm(){
    const params = useParams();
    const petId = params.id;
    const [currentData,setCurrentData] = useState([])
    const [petData, setPetData] = useState(false)

    // mostrar datos viejos del pet
    useEffect(() => {
      async function fetchData() {
        try {
          const res = await getPetData(petId);
          const data = [res[0].pictureURL, res[0].name, res[0].lat, res[0].lng];
          setCurrentData(data);
        } catch (error) {
          console.error('Error fetching pet data:', error);
        }
      }
    
      fetchData();
    }, [petData, petId]);

    
    //maneja el evento de enviar el form
    const handlePetDataSubmit = async (e) => {
      e.preventDefault();
      const img = localStorage.getItem("petImg")
      const geoloc = localStorage.getItem("petLocation")
      const location = JSON.parse(geoloc)

        const formData = new FormData(e.target)
        const data = {
            name : formData.get("name"),
            lat: location.latitude,
            lng: location.longitude,
            pictureURL: img ? img : currentData[0],
            reportLocation : formData.get("location")
          }

    localStorage.removeItem("petImg");
    localStorage.removeItem("petLocation");

    //envía las peticiones con la data dependiendo de lo que se cliqueó

        switch (e.nativeEvent.submitter.name) {
          case "submitButton1":
            try {    
                console.log('Button 1 clicked');
                const response = await updatePetData(data, petId)
                setPetData(true)
                return response 
            } catch (error) {
                console.error("Error al cambiar datos de mascotas", error);
                        return []
            } 
            break;
          case 'submitButton2':
            try {    
                console.log('Button 2 clicked');
                const status = {found:true}
                const response = await reportAsFound(status, petId)
                setPetData(true)
                return response 
            } catch (error) {
                console.error("Error al cambiar datos de mascotas", error);
                        return []
            } 
            break;
          case 'submitButton3':
            try {    
                console.log('Button 3 clicked');
                const response = await deleteReport(petId)
                setPetData(true)
                return response 
            } catch (error) {
                console.error("Error al cambiar datos de mascotas", error);
                        return []
            } 
            break;
          default:
            break;
        }
    };

    return (
    <div className={css.container}>
    <div className={css.root}>
        <form onSubmit={handlePetDataSubmit}>
                <label className={css.label}>NOMBRE</label>
                <input className={css.text_input} defaultValue={currentData[1] || ""} name="name" type="text" />
                <img className={css.photo} src={currentData && currentData[0] ? currentData[0] : nope}></img>
                <MyDropzone ></MyDropzone>

                <Mapbox></Mapbox>

                  {petData &&  <h3 className={css.alert} >Los datos se han guardado.</h3>}

                  <button type="submit" name="submitButton1" className={css.submit1}>Guardar</button>
                  <button type="submit" name="submitButton2" className={css.submit2}>Reportar encontrado</button>
                  <button type="submit" name="submitButton3" className={css.submit3}>Eliminar reporte</button>
                 <Link to="/my-reports"><button className={css.submit4}>Volver</button></Link>
        </form>
      </div>
    </div>)
}