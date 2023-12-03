import React, {useCallback, useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import css from "./index.css";
import { getPetData } from 'hooks/api';
import {useParams} from "react-router-dom"



export const MyDropzone = () => {
    const [acceptedFiles,setAcceptedFiles] = useState([])

    useEffect(() => {
    
      }, [acceptedFiles]);
      
    const onDrop = useCallback((acceptedFiles) => {
    for (const f of acceptedFiles){
        const reader = new FileReader()

        reader.onload = (e) =>{
            const res = e.target.result as any 
            localStorage.setItem("petImg", res);
        }
        reader.readAsDataURL(f)
    }
    setAcceptedFiles(acceptedFiles)

  }, [acceptedFiles]);

  const { getRootProps, getInputProps } = useDropzone({onDrop});


  return (
    <div {...getRootProps()} className={css.root}>
      <input {...getInputProps()} />
     
      <div>
        {acceptedFiles.length > 0 && (
          <div>
            <ul>
              {acceptedFiles.map((file) => (
                <div key={file.path}>
                  <h3 className={css.preview}>Preview:</h3>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.path}
                    style={{ maxWidth: '200%', maxHeight: '200px' }}
                  />
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button className={css.upload}>Cargar nueva foto</button>

    </div>
  );
};
 

