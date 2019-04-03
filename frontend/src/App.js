import React, { useCallback, useState } from 'react';
import {useDropzone} from 'react-dropzone'
import axios from 'axios';
import './App.scss';

const remoteUrl = 'https://jsonplaceholder.typicode.com/users';

const App = () => {
  const [fileUpLoading, setFileUpLoading] = useState(false);
  const [localImage, setLocalImage] = useState(null);
  const [remoteImage, setRemoteImage] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      const base64Encoded = reader.result
      base64Encoded && setLocalImage(base64Encoded)
      setShowUploadButton(true);
    }
    acceptedFiles.forEach(file => reader.readAsDataURL(file))
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})
  const handleUpload = (image) => {
    setFileUpLoading(true);
    try{
      axios.post(remoteUrl, { image })
      .then(res => {
        setShowUploadButton(false);
        setFileUpLoading(false);
        const imgData = res && res.data;
        const imgSrc = imgData && imgData.image;
        imgData && setRemoteImage(imgSrc);
      })
      .catch(err => {
        console.log(err);
      })
    } catch(e) {
      console.log(e);
    }
  }
  return (
    <>
      <div className="app">
        <div className="app--local">
          <div {...getRootProps()}>
            <input 
            {...getInputProps()} 
            accept=".jpg, .jpeg, .png, .gif, .ico, .tiff"
            className="app--local__input"/>
            { 
              localImage ?
              <>
                <img src={localImage} alt="local" className="app--local__image"/>
                <p>Click to select an image</p>
              </>
              :
              <div className="app--local__wrapper">
                <p>Drag 'n' drop an image here</p>
              </div>
            }
          </div>
          {
            showUploadButton && 
            <>
              <button onClick={() => handleUpload(localImage)} className="App--local__button">Upload</button>      
            </>
          }
        </div>
        <div className="app--remote">
          {
            remoteImage ?
            <>
              <img src={remoteImage} alt="remote" className="app--remote__image"/>
              <p>Converted image</p>
            </> :
            <div className="app--remote__placeholder">
              <p>Placeholder for converted image</p>
            </div>
          }
        </div>
      </div>
      {
        fileUpLoading &&
        <div className="loading">
          Uploading image...
        </div>
      }
    </>
  )
}

export default App;
