import os
import io
import time

from flask import request
from flask import Flask, flash, request, redirect, url_for, jsonify
from flask_cors import CORS

from werkzeug.utils import secure_filename

import base64
from PIL import Image
import cv2


UPLOAD_FOLDER = '/uploads'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 # Max 16 Megabytes
CORS(app)



@app.route("/")
def hello():
    return "Server is up and running! Disrupt AI API"

@app.route("/image", methods=['POST'])
def receive_image():
    if request.method == 'POST':
        json = request.get_json()
        picture = json['picture']
        decode64(picture)
        #stringToRGB(picture)
    return jsonify({'result':'Image uploaded'})

@app.route("/query", methods=['POST'])
def query_model():
    json = request.get_json()
    print(json['query'])
    return jsonify({'result':'Revenue is $90M'})

def decode64(base64Image):
    print(base64Image)
    decoded = base64.b64decode(base64Image)
    ts = int(time.time())
    path = "./uploads/image.jpeg"
    image = open(path, "wb+")
    image.write(decoded)
    return ''

def encode64(element):
    return base64.b64encode(element)


# Take in base64 string and return cv image
def stringToRGB(base64_string):
    imgdata = base64.b64decode(base64_string)
    image = Image.open(io.BytesIO(imgdata))
    zz = cv2.cvtColor(np.array(image), cv2.COLOR_BGR2RGB)
    print(zz)

# convert PIL Image to an RGB image( technically a numpy array ) that's compatible with opencv
def toRGB(image):
    return cv2.cvtColor(np.array(image), cv2.COLOR_BGR2RGB)




 