import React, { useCallback, useState } from 'react';
import {useDropzone} from 'react-dropzone'
import './App.scss';

const App = () => {
  const [localImage, setLocalImage] = useState(null);
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      const base64Encoded = reader.result
      setLocalImage(base64Encoded)
    }
    acceptedFiles.forEach(file => reader.readAsDataURL(file))
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className="App--local">
      <input {...getInputProps()} accept=".jpg, .jpeg, .png, .gif, .ico, .tiff"/>
      {
        isDragActive ?
          <p>Drop your image here</p> :
          <p>Drag 'n' drop an image here, or click to select an image</p>
      }
      {
        localImage && 
        <img src={localImage} alt="local" className="App--local__image"/>
      }
    </div>
  )
}


export default App;
