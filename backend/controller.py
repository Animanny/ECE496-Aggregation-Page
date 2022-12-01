

from flask import jsonify, request, Response
from flask_restful import Resource, reqparse
from config import app
import json

def generateScript(data):

    finalJson = {}
    
    #generate clang-plugins dict
    #tempObj = json.loads(data["clang-plugins"].replace("{", "").replace("}",""))
    json_acceptable_string = data["clang-plugins"].replace("'", "\"")
    d = json.loads(json_acceptable_string)
    finalJson["clang-plugins"] = d
    #if generating a makefile
    if data.get('make_args') and data.get('make_progname'):
        #generate makefile args
        finalJson['make_args'] = data['make_args']
        finalJson['make_progname'] = data['make_progname']
    
    #generate make_cfiles list
    json_acceptable_string = data['make_cfiles'].replace("'", "\"")
    d = json.loads(json_acceptable_string)
    finalJson['make_cfiles'] = d

    return finalJson
        

class ScriptGenerator(Resource):
    def get(self):
        return
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("clang-plugins", required=True, location='json')
        parser.add_argument("make_args", required=False, location='json')
        parser.add_argument("make_cfiles", required=True, location='json')
        parser.add_argument("make_progname", required=False, location='json')
        data = parser.parse_args()
        generatedScript= generateScript(data)
        print(generatedScript)
        script = jsonify(generatedScript)
        
        return script