<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Finding job output](#finding-job-output)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Starting the agent on hosts

```
sudo -u <USER> /opt/TIDAL/Agent/bin/tagent <HOST> start
``

# Finding job output

```
sudo find /opt/TIDAL/Agent/ -name "*118293*"
/opt/TIDAL/Agent/<HOST>/ES_GHSCDISTMLX1v_1/services/2/data/118293.sto
/opt/TIDAL/Agent/<HOST>/ES_GHSCDISTMLX1v_1/services/2/data/118293.ste
/opt/TIDAL/Agent/<HOST>/ES_GHSCDISTMLX1v_1/services/2/data/118293.inf
/opt/TIDAL/Agent/<HOST>/ES_GHSCDISTMLX1v_1/services/2/118293.tk
```
