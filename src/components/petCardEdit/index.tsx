import React, {useState, useEffect} from "react";
import { getUserReports } from "hooks/api";
import { useNavigate} from "react-router-dom"
import css from "./index.css";

import btn from "../../public/edit_button.png"


export function PetCardEdit(){
const [pets, setPets] = useState([])
const navigate = useNavigate();
const token = localStorage.getItem("token")
const id = localStorage.getItem("userId")
//30 - pep
//2 - auth
 
 /*   let pep = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODQ3OTYzNDN9._PIjCd95y37dRPCcf3kTs4jHhyNyCbiPaZ8h78I5XvA" */
    let auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTk4MTk0NTV9.63w40XMLvTNoL8W2gnPXXls6F_8T7w8mmXjeFx9sALA" 

    function redirectToPet(pet){
        localStorage.setItem("petIdEdit",pet.id) 
        const p = pet.id
        navigate("/report/edit/"+p) 
    }

    async function pullPetReports(){
        try {
        const response = await getUserReports(id, token)
        const json = await response
        setPets(json) 
        return json
        } catch (error) {
            console.error("Error al obtener datos de mascotas", error);
            return []
        }   
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await pullPetReports();
               /*  console.log("respuesta de getUserReports",result) */
                if (result && (result.length === 0 || result === undefined)) {
                    navigate('/empty');
                }
                
            } catch (error) {
                console.error("Error al obtener datos de mascotas", error);
            }
        };
    
        fetchData();
    }, []);


       return (
        <div className={css.cont}>
            {pets.map((p, index)=><div key={index} className={css.root}>
            <img className={css.petimg} src={p.pictureURL}/>
            <div className={css.container}>
                <div className={css.text_container}>
                    <div className={css.pet_name}>{p.name}</div>
                    <div className={css.pet_location}>{p.reportLocation}</div>
                </div>
                <img onClick={()=>redirectToPet(p)} className={css.button_edit} src={btn}/>
            </div>
        </div>
           )
           }
        </div>
        ) 
    }

    




