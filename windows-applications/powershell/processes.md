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
