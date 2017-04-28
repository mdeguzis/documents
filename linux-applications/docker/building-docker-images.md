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

The docker build command is quite simple - it takes an optional tag name with -t and a location of the directory containing the Dockerfile.

```
cd <DOCKER_PROJECT_DIR>
docker build -t mike/testimage .
```

# Links

* https://prakhar.me/docker-curriculum/
