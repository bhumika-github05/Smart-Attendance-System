from flask import Flask, render_template, Response
import cv2, face_recognition, os
import numpy as np
import pandas as pd
from datetime import datetime

app = Flask(__name__)

# =====================
# LOAD DATASET
# =====================
path = 'dataset'
images = []
classNames = []

for file in os.listdir(path):
    img = cv2.imread(f"{path}/{file}")
    images.append(img)
    classNames.append(os.path.splitext(file)[0])

def findEncodings(images):
    encodes = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encodes.append(face_recognition.face_encodings(img)[0])
    return encodes

encodeListKnown = findEncodings(images)

def markAttendance(name):
    file = "attendance.csv"
    try:
        df = pd.read_csv(file)
    except:
        df = pd.DataFrame(columns=["Name","Time"])

    if name not in df["Name"].values:
        now = datetime.now().strftime("%H:%M:%S")
        df.loc[len(df)] = [name, now]
        df.to_csv(file,index=False)

camera = cv2.VideoCapture(0)

def gen_frames():
    while True:
        success, img = camera.read()
        imgS = cv2.resize(img,(0,0),None,0.25,0.25)
        imgS = cv2.cvtColor(imgS,cv2.COLOR_BGR2RGB)

        faces = face_recognition.face_locations(imgS)
        encodes = face_recognition.face_encodings(imgS,faces)

        for encodeFace,faceLoc in zip(encodes,faces):
            matches = face_recognition.compare_faces(encodeListKnown,encodeFace)
            faceDis = face_recognition.face_distance(encodeListKnown,encodeFace)
            matchIndex = np.argmin(faceDis)

            if matches[matchIndex]:
                name = classNames[matchIndex].upper()
                markAttendance(name)

        ret, buffer = cv2.imencode('.jpg', img)
        frame = buffer.tobytes()

        yield(b'--frame\r\n'
              b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# =====================
# ROUTES
# =====================
@app.route('/')
def dashboard():
    return render_template('dashboard.html')

@app.route('/live')
def live():
    return render_template('live_attendance.html')

@app.route('/video')
def video():
    return Response(gen_frames(),
        mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/records')
def records():
    try:
        df = pd.read_csv("attendance.csv")
        data = df.values.tolist()
    except:
        data=[]
    return render_template('records.html', data=data)

@app.route('/students')
def students():
    return render_template('students.html')

if __name__ == "__main__":
    app.run(debug=True)
