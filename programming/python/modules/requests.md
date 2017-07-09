<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Post JSON payloads](#post-json-payloads)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

# Handling XML responses

Getting the tags
```
r = requests.get(url, auth=requests.auth.HTTPBasicAuth(username,password), verify=False)
#print r.text
# Note if request time was abnormally long
now = time.time()
if int(now - start) > 10:
    logging.warning("API request took longer than usual: " + str(int(now - start)) + " seconds")
if r.status_code == 200:
    logging.info("Request accepted")
    userlist = []

    # fromstring() parses XML from a string directly into an Element
    # This is the root element of the parsed tree.
    # These debug steps apply primarily to requests content

    # Here is a basic string representation of the response
    #print r.content

    # xmluserlist = ET.fromstring(r.text)
    xmlroot = ET.fromstring(r.text)
    for resultSize in xmlroot.iter('resultSize'):
        logging.info("Got " + resultSize.text + " results, processing...")
        print "Got " + resultSize.text + " results, processing..."

    # Show all elements of the root
    print "\n=== ROOT TAGS ===\n"
    count = 0
    for element in xmlroot.iter('*'):
        if element.tag == 'id':
            print "== Item: " + str(count) + " =="
            count += 1
        print element.tag
```

Once you know the tags, you can parse the items:
```
# Iterate the tag we want
for vXUsers in xmlroot.iter('vXUsers'):
    this_name = ''
    for name in vXUsers.iter('name'):
        this_name = name.text
    this_id = ''
    for user_id in vXUsers.iter('id'):
        this_id = user_id.text
    this_source = ''
    for userSource in vXUsers.iter('userSource'):
        this_source = userSource.text

    # We just want our user only for this function
    if this_name == user:
        print {'id': this_id, 'name': this_name, 'source': this_source}
        userlist.append({'id': this_id, 'name': this_name, 'source': this_source})

```

# Links

* http://docs.python-requests.org/en/master/
* [Reading JSON from a file](http://stackabuse.com/reading-and-writing-json-to-a-file-in-python/)
