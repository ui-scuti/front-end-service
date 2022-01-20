#!/usr/bin/env bash

set -e
# echo "installing yarn"
# npm install -g yarn

# echo "installing nodemon"
# npm install -g nodemon

echo "Installing dependencies..."
yarn


echo "Starting server"
echo "-------------------------------------------------------------------------"
yarn run start