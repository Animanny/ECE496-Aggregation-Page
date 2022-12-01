import os
from flask import Flask, send_from_directory, jsonify, request
from flask_restful import Api,Resource, reqparse

import config
import controller
app = Flask(__name__, static_folder='../frontend/build')
app.config['ENV'] = 'development'
app.config['DEBUG'] = True
app.config['TESTING'] = True
# Serve React App
config.init_app(app)
config.init_cors(app)

# API Endpoints
rest_api = Api(app)
rest_api.add_resource(controller.ScriptGenerator, '/scriptgen')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)
