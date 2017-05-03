# About

Infomrmation on building docker images

# Example

## Dockerfile

`vim Dockerfile`
```
# our base image
FROM python:3-onbuild

# specify the port number the container should expose
EXPOSE 5000

# run the application
CMD ["python", "./app.py"]
```

## Build

The docker build command is quite simple - it takes an optional tag name with -t and a location of the directory containing the Dockerfile. Tagging ahead of is a good idea in case you don't want to push the image right away.

```
cd <DOCKER_PROJECT_DIR>
docker build -t mike/testimage .
```

## Push an image to Docker Cloud (Docker Hub)

Before beginning, check your images
```
docker images
```

Example
```
# login
docker login

# tag image (if you have not already)
docker tag my_image <username>/my_image

# push image
docker push <username>/my_image
```

# Links

* https://prakhar.me/docker-curriculum/
* https://docs.docker.com/docker-cloud/builds/push-images/
