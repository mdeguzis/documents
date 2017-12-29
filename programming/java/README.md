<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Environement vars](#environement-vars)
- [Versions](#versions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Main documentation page for Java docs

# Education

* Lynda.com: https://www.lynda.com/Java-training-tutorials/1077-0.html

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

With some refinement:if you dno't 
```
java -XshowSettings:properties -version &> /tmp/java_out; cat /tmp/java_out | awk '/java.home/ {print $3}'

# Assigning to a var
JAVA_HOME=$(java -XshowSettings:properties -version &> /tmp/java_out; cat /tmp/java_out | awk '/java.home/ {print $3}')

# Double check for whitespace
echo "'$JAVA_HOME'"
'/usr/lib/jvm/java-1.8.0-oracle-1.8.0.141-1jpp.1.el7_3.x86_64/jre'
```

Or:
```
echo "$(dirname $(dirname $(readlink -f $(which javac))))/jre"
```

# Versions

```
java -version 2>&1 | head -n 3
```
