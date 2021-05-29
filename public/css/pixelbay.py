#! /usr/bin/env python3
import requests
import json
import os
import shutil
import subprocess
url="https://pixabay.com/api/?q=covid+19&key=19196085-78cbce97aff065ef6bb1b4ea6&min_width=1800&min_height=1000&per_page=200"
images=requests.get(url)
image = json.loads(images.text)
try:
    shutil.rmtree("/srv/Covid/public/css/gallery/",ignore_errors=True)
    os.mkdir("/srv/Covid/public/css/gallery/")
except:
    pass
pathfile=("/srv/Covid/public/css/gallery/paths.txt")
pathfile=open(pathfile,"a+")
os.chdir("/srv/Covid/public/css/gallery/")
for element in image["hits"]:
    url=element["largeImageURL"]
    path= "/css/gallery/"+ url.replace("https://pixabay.com/get/","")+"::"+element["user"]+"::"+element["pageURL"]
    pathfile.write(path)
    pathfile.write("\n")
    subprocess.run(["aria2c",url])
