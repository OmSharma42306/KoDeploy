FROM ubuntu:focal

RUN /usr/bin/apt-get update && \
    /usr/bin/apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    /usr/bin/apt-get update && \
    /usr/bin/apt-get upgrade -y && \
    /usr/bin/apt-get install -y nodejs && \
    /usr/bin/apt-get install -y git

WORKDIR /home/app


# Copy Build.sh

COPY build.sh .

COPY script.js .
COPY package.json .
COPY package-lock.json .
COPY .env . 


# EXECUTING SCRIPT

RUN chmod +x build.sh



# ENTRYPOINT
ENTRYPOINT [ "./build.sh" ]
