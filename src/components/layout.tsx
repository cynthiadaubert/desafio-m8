import React from "react";
import {Outlet} from "react-router-dom"
/* import { SearchForm } from "./SearchForm"; */
import { Header } from "./header";

function Layout() {
  
  return (<div>
   
      
      <Outlet></Outlet>

  </div>)
}

export {Layout};