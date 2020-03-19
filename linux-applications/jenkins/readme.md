<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Information on installing, using, and configuring Jenkins.

# Scripted Pipelines

## Dynamically setting script vars
```
node('somehost.domain.com'){
    env.PY2_RPM_DEPS="python-requests"
    for (String PYVERSION : [2]) {
        if (PYVERSION == 2) {
            env.DEPS = env.PY2_RPM_DEPS
        } else {
            env.DEPS = "nothing"
        }
        print "VAR SET IS: " + DEPS
        sh script: '''
            echo ${DEPS}
        '''
    }
}
```

This yields:
```
Started by user Deguzis, Michael T.
Rebuilds build #93
Running in Durability level: MAX_SURVIVABILITY
[Pipeline] Start of Pipeline
[Pipeline] node
Running on somehost.domain.com in /opt/jenkins/workspace/job-examples/sequential-build
[Pipeline] {
[Pipeline] echo
VAR SET IS: python-requests
[Pipeline] sh
+ echo python-requests
python-requests
[Pipeline] }
[Pipeline] // node
[Pipeline] End of Pipeline
Finished: SUCCESS
```


# Links

* [Jenkins wiki](https://wiki.jenkins-ci.org/display/JENKINS)
