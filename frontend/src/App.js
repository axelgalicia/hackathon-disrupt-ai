import React, { useCallback, useState } from 'react';
import {useDropzone} from 'react-dropzone'
import './App.scss';
import TrainingGif from './training.gif';
import * as API from './api/AI'

const App = () => {
  const [fileUpLoading, setFileUpLoading] = useState(false);
  const [localImage, setLocalImage] = useState(null);
  const [error, setError] = useState(null);
  const [remoteImage, setRemoteImage] = useState(null);

  const [remoteQuery, setRemoteQuery] = useState(null);
  const [queryResponse, setQueryResponse] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader()
    reader.onabort = () => setRemoteImage('file reading was aborted')
    reader.onerror = () => setRemoteImage('file reading has failed')
    reader.onload = () => {
      const base64Encoded = reader.result
      base64Encoded && setLocalImage(base64Encoded)
      setShowUploadButton(true);
      setRemoteImage(null);
    }
    acceptedFiles.forEach(file => reader.readAsDataURL(file))
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})
  const handleUpload = (image) => {
    setFileUpLoading(true);
    setShowUploadButton(false);
    try{
      API.postImage(image).then( res => {
        setTimeout(() => {
          setShowUploadButton(false);
          setFileUpLoading(false);
          setQueryResponse(false);
          setRemoteQuery(null);
          setRemoteImage(image);
        }, 3000);
      })
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => {
        setFileUpLoading(false);
        setError(error.message);
      });
    }
    catch(e) {
      setError(e.message);
    }
  }
  const handleUserInput = () => {
    setQueryResponse(null);
  }
  // Handles Query
  const handleQuery = (query) => {
    API.queryModel(query).then( res => {
      setShowUploadButton(false);
      setFileUpLoading(false);
      setQueryResponse(res.result);
    });
  }
  return (
    <>
      <div className="app">
        <div className="app--local">
          <div {...getRootProps()} className="app--local__wrapper">
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
              <div className="app--local__placeholder">
                <p>Drag 'n' drop an image here</p>
              </div>
            }
          </div>
          {
            showUploadButton ? 
            <>
              <button onClick={() => handleUpload(localImage)} className="app--local__button">Upload</button>      
            </>:
            fileUpLoading &&
            <div className="app--local__loading">
              <img src={TrainingGif} alt="training" />
              <p>Training...</p>
            </div>
          }
          {
            error &&
            <div className="error">
              Error: {error}
            </div>
          }
        </div>
        <div className="app--remote">
          {
            remoteImage ?
            <>
              <img src={remoteImage} alt="remote" className="app--remote__image"/>
              <div className="app--remote__query">
              <input type="text" className="app--remote__input" onChange={() => handleUserInput()}></input> 
              <button onClick={() => handleQuery(remoteQuery)} className="app--remote__button">Query</button>
              <p>{ queryResponse ? queryResponse : '' }</p>
            </div>
            </> :
            <div className="app--remote__placeholder">
              <p>Placeholder for converted image</p>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default App;
