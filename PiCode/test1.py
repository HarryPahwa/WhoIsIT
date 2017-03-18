import argparse
import base64
import picamera
import json

from googleapiclient import discovery
from oauth2client.client import GoogleCredentials

import os
import glob
import subprocess
import calendar
import time
import urllib2
import serial

url = 'https://who-is-it-alexa-rpi-project.firebaseio.com/DoorBell/Name.json'
from pprint import pprint		


def takephoto():
    camera = picamera.PiCamera()
    camera.capture('image.jpg')

def main():
    
    takephoto() # First take a picture
   # """Run a label request on a single image"""

    credentials = GoogleCredentials.get_application_default()
    service = discovery.build('vision', 'v1', credentials=credentials)

    with open('image.jpg', 'rb') as image:
        image_content = base64.b64encode(image.read())
        service_request = service.images().annotate(body={
            'requests': [{
                'image': {
                    'content': image_content.decode('UTF-8')
                },
                'features': [{
                    'type': 'FACE_DETECTION',
                    'maxResults': 10
                }]
            }]
        })
        response = service_request.execute()
#	print response[0]
#	config = json.loads(response)
#	postdata = {
 #               'Name':config["faceAnnotations"]
  #              }
#
 #       req = urllib2.Request(url)
  #      req.add_header('Content-Type','application/json')
   #     data = json.dumps(postdata)

    #    response2 = urllib2.urlopen(req,data)
        print json.dumps(response, indent=4, sort_keys=True)	#Print it out and make it somewhat pretty.
	a=response["responses"][0]["faceAnnotations"][0]["angerLikelihood"]
	print a	
	if a=="VERY_UNLIKELY"
	putdata={"Okay": "There is someone at the door. Image analysis tells me that it is very unlikely that they are angry. It is safe to open the door. Harry" }
	else
	putdate={"Okay": "There is someone at the door. Image analysis tells me that they are angry. Please exercise caution. Harry"}
	req=urllib2.Request(url)
	req.add_header('Content-Type','application/json')
	data=json.dumps(putdata)
	response2=urllib2.urlopen(req,data)



if __name__ == '__main__':

    main()
