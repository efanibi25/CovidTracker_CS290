#! /usr/bin/env python3
import csv
import subprocess
import os
from mongoengine import connect


subprocess.run(["wget","https://static.usafacts.org/public/data/covid-19/covid_confirmed_usafacts.csv", "-O", "covid_confirmed_usafacts.csv"
])
#
subprocess.run(["wget","https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv", "-O", "covid_deaths_usafacts.csv"
])
subprocess.run(["wget","https://static.usafacts.org/public/data/covid-19/covid_county_population_usafacts.csv", "-O", "covid_county_population_usafacts.csv"
])
#Delete Old Data
connection=connect('covid')
connection.drop_database('covid')


os.chdir("/srv/Covid/database/")
subprocess.run(["mongoimport" ,"--type", "csv", "-d" ,"covid" ,"--headerline", "covid_deaths_usafacts.csv"])
subprocess.run(["mongoimport" ,"--type", "csv", "-d" ,"covid" ,"--headerline", "covid_confirmed_usafacts.csv"])
subprocess.run(["mongoimport" ,"--type", "csv", "-d" ,"covid" ,"--headerline", "covid_county_population_usafacts.csv"])
