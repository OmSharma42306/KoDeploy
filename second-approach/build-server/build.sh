#!/bin/bash

set -e 

echo "Cloning Git Repo... $GIT_REPO_URL"

git clone $GIT_REPO_URL /home/app/output


npm install 

node script.js
