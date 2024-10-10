import React,  {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom"
import css from "./index.css";

import logo from "../../public/logo_pets.png"
import lines from "../../public/menu.png"
import cross from "../../public/cross.png"


export function Header(){
const userEmail = localStorage.getItem("userEmail")
const [isOpen,setIsOpen] = useState(false)
const [showLoggedIn,setLoggedIn] = useState(false)
const navigate = useNavigate()

//abre y cierra menú
 const toggleMenu = ()=>{
  setIsOpen(!isOpen)
}


// handlers de redirección
const handleProfileClick = () => {
  toggleMenu()
  if (userEmail === null){
  navigate("/login")
}else if (userEmail == "null"){
  navigate("/login")
}else {
    navigate("/profile")
  }
}

const handleMyReportsClick = () => {
  toggleMenu()
  if (userEmail === null){
  navigate("/login")
  }else if (userEmail == "null"){
    navigate("/login")
  }else {
    navigate("/my-reports")
  }
}

const handleNewReportClick = () => {
  toggleMenu()
  if (userEmail === null){
  navigate("/login")
}else if (userEmail == "null"){
  navigate("/login")
}else {
    navigate("/report")
  }
}

// cerrar sesión
const logout = ()=>{
  localStorage.clear()
  navigate("/")
}

// muestra opción de cerrar sesión solamente si el usuario está completamente logueado

useEffect(() => {
  if (userEmail === null || userEmail === "null") {
    setLoggedIn(false);
  } else if (userEmail !== null && ["/profile", "/pets", "/", "/empty","/report", "/my-reports"].includes(location.pathname)) {
    console.log("patata");
    setLoggedIn(true);
  }
}, [userEmail, location.pathname]); 


return (
    <div className={css.root}>
      <div className={css.cont}>
      <Link to="/"> <img className={css.logo} src={logo}/> </Link>
          <img className={css.lines} onClick={toggleMenu} src={lines}/>
      </div>    
{   <div className={`${css.box} ${isOpen ? css.visible : ''}`}>
    
        <img className={css.cross} onClick={toggleMenu} src={cross}/>
        <div className={css.links}>
          <a href="" onClick={handleProfileClick} className={css.mydatalink}>Mis datos</a>
          <a href="" onClick={handleMyReportsClick} className={css.mypetslink}>Mis mascotas reportadas</a>
          <a href="" onClick={handleNewReportClick} className={css.reportlink}>Reportar mascota</a>
         {showLoggedIn && <h2 className={css.userEmail}>{userEmail}</h2>} 
       {showLoggedIn && <h1 className={css.logout}  onClick={logout}>CERRAR SESIÓN</h1>}
        </div>
    </div> }
    </div>
)

}