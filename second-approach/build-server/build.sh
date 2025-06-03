#!/bin/bash

set -e 

echo "Cloning Git Repo... $GIT_REPO_URL"

git clone $GIT_REPO_URL

# Run a Build The Project and Upload Build folder to S3.

tail -f /dev/null