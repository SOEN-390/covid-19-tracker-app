#!/bin/bash
cd /home/ec2-user/covid-19-tracker-app
docker-compose build --no-cache
docker-compose up -d
