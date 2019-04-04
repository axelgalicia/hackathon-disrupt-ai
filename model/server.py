import os
import io
import time

from flask import request
from flask import Flask, flash, request, redirect, url_for, jsonify
from flask_cors import CORS

import numpy as np


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
    return jsonify({'result':'Image uploaded'})

@app.route("/query", methods=['POST'])
def query_model():
    json = request.get_json()
    query = json['query']
    print(query)
    return jsonify({'result':'Revenue is $90M'})

def decode64(base64Image):
    restoreImage(base64Image)
    if len(base64Image) % 4 != 0: #check if multiple of 4
        while len(base64Image) % 4 != 0:
            base64Image = base64Image + "="
            decoded = base64.b64decode(base64Image)
        else:
            decoded = base64.b64decode(base64Image)
    ts = int(time.time())
    path = "./uploads/image.jpeg"
    image = open(path, "wb+")
    image.write(decoded)
    return ''

def encode64(element):
    return base64.b64encode(element)

def restoreImage(base64Image):
    # Convert String of image data to uint8
    np_arr = np.fromstring(base64Image, np.uint8)
    print(np_arr.size)
    return ''






 