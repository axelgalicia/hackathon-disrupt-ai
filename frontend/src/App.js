import React, { useCallback } from 'react';
import {useDropzone} from 'react-dropzone'
import './App.scss';

const App = () => {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      // Do whatever you want with the file contents
      const base64Encoded = reader.result
     console.log(base64Encoded)
    }

    acceptedFiles.forEach(file => reader.readAsDataURL(file));

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
