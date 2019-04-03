export const API = 'http://localhost:5000'
const QUERY_ENDPOINT = 'query'
const IMAGE_UPLOAD_ENDPOINT = 'image'


const headers = {
    'Accept': 'application/json'
}


export const queryModel = (query) =>
    fetch(`${API}/${QUERY_ENDPOINT}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    }).then(res => res.json())


    export const postImage = (bas64Image) =>
    fetch(`${API}/${IMAGE_UPLOAD_ENDPOINT}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ picture: bas64Image })
    }).then(res => res.json())