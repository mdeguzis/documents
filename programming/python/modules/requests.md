# About

Information and how-to with the requests module

# Post JSON payloads

Example for Hadoop Ambari service checks
```
# NOTE: Don't set header: Content-Type: application/json
HEADERS = {'X-Requested-By': 'ambari'}
URL = AMBARI_URI + ":" + AMBARI_PORT + "/api/v1/clusters/" + CLUSTER_NAME + "/request_schedules"

print "Payload: " + str(JSON_FILE)
print "Headers: " + str(HEADERS)
print "Making API connection to: " + URL
print "Making request for '" + CLUSTER_NAME + "' service checks..."

r = requests.post(URL, headers=HEADERS, data=open(JSON_FILE, 'rb'), auth=requests.auth.HTTPBasicAuth(AMBARI_USERNAME, AMBARI_PASSWORD), verify=False)

# We are looking for HTTP return status 201 "Created"
# See: http://www.restapitutorial.com/httpstatuscodes.html
if r.status_code == 201:
    print("Request accepted by Ambari API")
    break

else:
    print("Service request failed due to: " + r.reason)
    print("Attempting another connection (" + str(connection_tries) + " of 3)")
    connection_tries += 1
    if connection_tries == 0:
        print("Connection tries exhausted, failing.")
        print("Service request failed due to: " + r.reason)
        sys.exit(1)

```

# Links

* http://docs.python-requests.org/en/master/
* [Reading JSON from a file](http://stackabuse.com/reading-and-writing-json-to-a-file-in-python/)
