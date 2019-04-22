<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [What's the diffence?](#whats-the-diffence)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# What's the diffence?

* RUN executes command(s) in a new layer and creates a new image. E.g., it is often used for installing software packages.
* CMD sets default command and/or parameters, which can be overwritten from command line when docker container runs.
* ENTRYPOINT configures a container that will run as an executable.

Source: http://goinbigdata.com/docker-run-vs-cmd-vs-entrypoint/
