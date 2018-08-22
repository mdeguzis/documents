<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Get Total Memory Used By An Application](#get-total-memory-used-by-an-application)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Working with Processes

# Get Total Memory Used By An Application

This is useful for applicaitons like Chrome that spawn multiple processes

Total list (sorted) in MB
```
ps | Group ProcessName | Select Name, @{Label="Mem";Expression={($_.group |Measure WorkingSet
m).Sum / 1MB }} | Sort Me
```

Total list (sorted) in GB
```
ps | Group ProcessName | Select Name, @{Label="Mem";Expression={($_.group |Measure WorkingSet
m).Sum / 1GB }} | Sort Me
```

Find just Chrome
```
ps | Group ProcessName | Select Name, @{Label="Mem";Expression={($_.group |Measure WorkingSet
m).Sum / 1MB }} | Sort Me | findstr chrome
```
