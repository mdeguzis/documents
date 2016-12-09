<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Useful commands](#useful-commands)
- [Tag and upload](#tag-and-upload)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Useful info for Docker

# Useful commands

Enter container

```
docker run -t -i <repository_or_name>:<tag> /bin/bash
```

run command in container:

```
docker run -i $DOCKER_IMAGE /bin/bash -c command.sh
```

# Tag and upload

See: https://docs.docker.com/engine/getstarted/step_six/

