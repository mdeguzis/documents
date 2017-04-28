<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Useful commands](#useful-commands)
- [Tag and upload](#tag-and-upload)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Useful info for Docker

# Working with images

pull image
```
docker pull <IMAGE>:<TAG>
```

list images
```
docker images
```

# Working with containers

Enter container

```
docker run -t -i <repository_or_name>:<tag> /bin/bash
```

run command in container

```
docker run -i $DOCKER_IMAGE /bin/bash -c command.sh
```

removing a container
```
# List container ids with `docker ps -a`
docker rm <CONTAINER_ID>
```

stop all containers
```
docker stop $(docker ps -a -q)
```

remove all containers
```
docker rm $(docker ps -a -q)
```

# Monitoring

Process monitoring
```
docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES

$ docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                      PORTS               NAMES
305297d7a235        busybox             "uptime"            11 minutes ago      Exited (0) 11 minutes ago                       distracted_goldstine
ff0a5c3750b9        busybox             "sh"                12 minutes ago      Exited (0) 12 minutes ago                       elated_ramanujan
```

# Tag and upload

See: https://docs.docker.com/engine/getstarted/step_six/


# Links

* [Docker - getting started](https://docs.docker.com/get-started/)
