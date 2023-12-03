import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom"

function SearchResults() {

  const params = useParams()
  const [results,setResults] = useState([])

  async function pullResults(q) { // no podemos usar async y await dentro de useEffect
    const response = await fetch("https://api.mercadolibre.com/sites/MLA/search?q="+ params.query)
    const json = await response.json()
/* console.log(json) */
   setResults(json.results)
  }

  useEffect(()=>{
    pullResults(params.query)
  },[params])
  
  return (<ul>
   {results.map((r)=><li>
    <Link to ={"/item/"+r.id}>
      <h2>{r.title}</h2>
    </Link>
   </li>)}
 </ul>)
}

export {SearchResults};