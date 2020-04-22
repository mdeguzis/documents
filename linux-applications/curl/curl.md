<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Testing websites](#testing-websites)
  - [Response code only](#response-code-only)
  - [Up or down](#up-or-down)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Information on using curl

# Testing websites

* `-L` is for follow redirects

## Response code only
```
curl -L -s -o /dev/null -w "%{http_code}\n" http://HOST:PORT
```

## Up or down
```
curl https://google.com -s -f -o /dev/null && echo “Website up”|| echo "Website down."
```

# Links

* [Curl error codes](https://curl.haxx.se/libcurl/c/libcurl-errors.html)
