# Instructions to run Python Server in Flask

1) Install Python 3
2) Create a Virtual Environment for this project
    ```
    python3 -m venv venv
    ```
3) Activate the virtual environment
 ```
    . venv/bin/activate
 ```
 3) Install Dependencies
  ```
  pip install Flask
  pip install Pillow
  pip install opencv-python
  pip install -U flask-cors
  ```

  4) Run the python server

  ```
 $ export FLASK_APP=server.py
 $ flask run
  ```

### http://flask.pocoo.org/docs/1.0/installation/#dependencies
