from flask import Flask, jsonify, request
from werkzeug.utils import secure_filename
import os
import cv2

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = set(['jpg', 'jpeg', 'png'])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in app.config['ALLOWED_EXTENSIONS']

@app.route('/segment', methods=['POST'])
def segment_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'})
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type'})
    
    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    
    img = cv2.imread(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    # perform segmentation using pre-trained model
    mask = ...
    # do something with the mask (e.g. save it, return it as JSON)
    ...
    return jsonify({'result': 'success'})

if __name__ == '__main__':
    app.run(debug=True)
