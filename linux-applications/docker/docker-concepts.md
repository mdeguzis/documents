# What's the diffence?

* RUN executes command(s) in a new layer and creates a new image. E.g., it is often used for installing software packages.
* CMD sets default command and/or parameters, which can be overwritten from command line when docker container runs.
* ENTRYPOINT configures a container that will run as an executable.

Source: http://goinbigdata.com/docker-run-vs-cmd-vs-entrypoint/
