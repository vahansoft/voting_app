#!/usr/bin/env bash

mongo --eval "db.getSiblingDB('$MONGO_DATABASE').createUser({user:'$MONGO_USERNAME', pwd:'$MONGO_PASSWORD', roles:[{role:'readWrite',db:'$MONGO_DATABASE'}]});"

echo "Project Setup success."