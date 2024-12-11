#!/bin/bash

npm run build
scp -r build/* ubuntu@34.233.251.174:/var/www/html/