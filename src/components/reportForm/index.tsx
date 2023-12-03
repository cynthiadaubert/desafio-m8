import React, {useState} from "react";
import {Link } from "react-router-dom"
import css from "./index.css";
import { createPet } from "hooks/api";
import { MyDropzone } from "components/dropzone";
import { Mapbox } from "components/mapbox";
import nope from "../../public/no_image.png"


export function ReportForm(){
    const [petData, setPetData] = useState(false)

    const handleSubmitData = async (e)=>{
        e.preventDefault()
        const userId = localStorage.getItem("userId")
        const img = localStorage.getItem("petImg")
        const geoloc = localStorage.getItem("petLocation")
        const location = JSON.parse(geoloc)

        const formData = new FormData(e.target)
        const data = {
            name : formData.get("name"),
            lat: location.latitude,
            lng: location.longitude,
            pictureURL: img ? img : nope,
            reportLocation : formData.get("location"),
            userId: userId
        }

        try {
            const res = await createPet(data)        
        localStorage.removeItem("petImg");
        localStorage.removeItem("petLocation");
        setPetData(true)
            return res
        } catch (error) {
            console.log("Error al crear pet", error)
            return []
        }
    }

    return (
    <div className={css.root}>
        <form onSubmit={handleSubmitData}>
            <label className={css.label}>NOMBRE</label>
            <input className={css.text_input} name="name" type="text" />
            <MyDropzone></MyDropzone>
            <Mapbox></Mapbox>
            {petData &&  <h3 className={css.alert} >Gracias por enviar su reporte!</h3>}
            <button  className={css.submit1}>Reportar mascota</button>
        </form>
            <Link to="/"><button  className={css.submit2}>Volver</button></Link>
    </div>)
}