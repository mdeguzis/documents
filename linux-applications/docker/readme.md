<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Working with images](#working-with-images)
- [Working with containers](#working-with-containers)
- [Monitoring](#monitoring)
- [SSL](#ssl)
- [Firewall](#firewall)
  - [Exposing ports for the container firewall](#exposing-ports-for-the-container-firewall)
    - [Opening a port](#opening-a-port)
    - [Locally](#locally)
- [Tag and upload](#tag-and-upload)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Useful info for Docker

# Working with images

searching for images on the cli
```
docker search
```

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

# SSL

For example with Jenkins:

```
sudo docker run -d \
		--name jenkins_server \
		--user 1000 \
		--privileged \
		--volume /home/jenkins:/var/jenkins_home \
		--publish 443:8443 \
		$(ENV_OPTS) \
		geisinger-jenkins \
		--httpPort=-1 \
		--httpsPort=8443 \
		--httpsKeyStore=/var/jenkins_home/.keystore/jenkins_keystore.jks \
		--httpsKeyStorePassword="$(KEYSTORE_PASSWORD)"
```


```
-u 1000
         The UID of the host jenkins user

--privileged
         Required for SELinux environments and usage of SSL

-v /home/jenkins:/var/jenkins_home
          exposes the host home folder to the jenkins docker container
-p 443:8443
          maps 8443 jenkins port in the container to the 443 port of the host
--httpPort=-1 --httpsPort=8443
          blocks jenkins http and exposes it with https on port 8443 inside the container
--httpsKeyStore=/var/jenkins_home/jenkins_keystore.jks --httpsKeyStorePassword=mypassword
          provides your keystore that has been mapped from the host home folder to the container /var/jenkins_home/ folder.
```

Source: [StackOverflow](http://stackoverflow.com/questions/29755014/setup-secured-jenkins-master-with-docker)

# Firewall

## Exposing ports for the container firewall

### Opening a port

```
--publish 443:8443
```

### Locally

There is a way to bind a docker container to only local host, i.e. to forward a service via Apache on the local system. 

Use this syntax: 
```
{{-p 127.0.0.1:50111:8080}}
```

This will bind the service's port 8080 in the docker container to 50111 on the local host only without punching a hole in the firewall.


# Tag and upload

See: https://docs.docker.com/engine/getstarted/step_six/


# Links

* [Docker - getting started](https://docs.docker.com/get-started/)
