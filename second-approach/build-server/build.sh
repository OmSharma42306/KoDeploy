#!/bin/bash

set -e 

echo "Cloning Git Repo... $GIT_REPO_URL"

git clone $GIT_REPO_URL /home/app/output

# Run a Build The Project and Upload Build folder to S3.

node script.js

tail -f /dev/null