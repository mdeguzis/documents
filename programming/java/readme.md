<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Versions](#versions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Main documentation page for Java docs

# Environement vars

To see all properties:
```
java -XshowSettings:properties -version
```

JAVA_HOME

Check `java.home` under:
```
java -XshowSettings:properties -version
```

With some refinement:
```
java -XshowSettings:properties -version &> /tmp/java_out; cat /tmp/java_out | awk -F'=' '/java.home/ {print $2}'
```

Or:
```
echo $(dirname $(dirname $(readlink -f $(which javac))))
```

# Versions

```
java -version 2>&1 | head -n 3
```
