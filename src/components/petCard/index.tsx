import React, {useState, useEffect} from "react";
//importar hooks como useLogin
import { getPetsAroundMe, sendPetReport } from "hooks/api";
import { useGeolocation } from "hooks/hooks";
import { currentLocationState } from "hooks/atoms";
import css from "./index.css";

import btn from "../../public/report-button.png"
import cross from "../../public/cross.png"
import not from "../../public/pet-found.png"
import { useRecoilValue } from "recoil";


export function PetCard(){

    //botón para abrir y cerrar
    function ModalButton(){
     const [isOpen,setIsOpen] = useState(false)
     const [selectedPet, setSelectedPet] = useState(null);

    const toggleForm = (pet) =>{
        setSelectedPet(pet);
        setIsOpen(!isOpen)

    }

    // enviar form con sengrid
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const petId = selectedPet.id
        const petname = selectedPet.name
        const phone = e.target.phone.value
        const comments = e.target.comments.value
        const username = localStorage.getItem("userEmail")
      
        const data = {petname, phone, username, comments}

         try {
            const res = await sendPetReport (data, petId)
            alert("Gracias por enviar el reporte")
            return res
          } catch (error) {
          console.log(error)
          return [] 
          }  
        
    }

    //estados del pet, localización y si hay pets guardados
    const [pets, setPets] = useState([]) 
    const {location} = useGeolocation()
    const [hasLoadedPets, setHasLoadedPets] = useState(false);
    const geoloc = useRecoilValue(currentLocationState)

   //devolver los pets de esa zona
    async function pullPetsArray(){

       if (location){ 
        const array = [geoloc.latitude,geoloc.longitude]
        const response = await getPetsAroundMe(array[0],array[1])
        const json = await response
        console.log("mascotas alreadedor",json.found)
       setPets(json.found)
       } 
    }
   
     useEffect(()=>
     {if (location && !hasLoadedPets)
   { pullPetsArray()
    setHasLoadedPets(true) /* agregamos un estado adicional para que no vuelva a lanzar la petición si el array de pets ya está cargado */
    }}, [location, hasLoadedPets]) 
 
    if (!location) {
        return <p>Loading...</p>;
    } 

    if (!pets) {
        return <h1 className={css.message}>No hay mascotas perdidas en tu ubicación.</h1>;
    } 


    return (
        <div className={css.cont} >
            {pets.map((p,index)=><div key={index} className={css.root}>
            <img className={css.petimg} src={p.pictureURL}/>
            <div className={css.container}>
                <div className={css.text_container}>
                    <div className={css.pet_name}>{p.name}</div>
                    <div className={css.pet_location}>{p.reportLocation}</div>
                </div>
                <img onClick={()=>toggleForm(p)} className={css.button_edit} src={p.found ? not : btn}/> {/* le pasamos el pet a través de modal para que se pueda pasar el nombre en el form */}
            </div>

            {isOpen && (
                 <div className={css.box}>
                    <img onClick={()=>toggleForm(null)} className={css.cross} src={cross}/> {/* // le ponemos null para que se cierre sin pets asociados */}
                    <div className={css.report_title}>Reportar info de {selectedPet?.name}</div>
           
                    <form className={css.form} onSubmit={handleFormSubmit}>
                          
                        <label >NOMBRE</label>
                        <input className={css.inp}  type="text" name="name" required/>
           
                        <label >TELÉFONO</label>
                        <input className={css.inp} type="text" name="phone" required/>
           
                        <label >¿DÓNDE LO VISTE?</label>
                        <textarea className={css.textarea} name="comments"></textarea>
           
                        <button className={css.btn} type="submit">Enviar información</button>
                    </form>
               </div>
            )}

           </div> )
            }
  
           
            
        </div> 
       
    )

    }

    return <ModalButton/>
}
