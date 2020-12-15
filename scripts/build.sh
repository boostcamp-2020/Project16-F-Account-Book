#!/bin/bash

tags=($1)
DOCKER_USER=$2
DOCKER_PASSWORD=$3

serverRepoName="${DOCKER_USER}/accountbook-server"
clientRepoName="${DOCKER_USER}/accountbook-client"

docker login --username $DOCKER_USER --password $DOCKER_PASSWORD || exit 1

yarn install && yarn build || exit 1

docker-compose -f docker-compose.build.yml build --parallel || exit 1

if [ ${tags[0]} != "pre-release" ]
then 
    tags+=("latest")
fi

for tag in ${tags[@]}; do
    docker tag accountbook-server:pre-release ${serverRepoName}:${tag}
    docker tag accountbook-client:pre-release ${clientRepoName}:${tag}
    docker push ${serverRepoName}:${tag}
    docker push ${clientRepoName}:${tag}
done
