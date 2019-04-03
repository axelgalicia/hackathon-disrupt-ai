import React, { useCallback } from 'react';
import {useDropzone} from 'react-dropzone'
import './App.scss';

const App = () => {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop your image here</p> :
          <p>Drag 'n' drop an image here, or click to select an image</p>
      }
    </div>
  )
}


export default App;
