<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Post JSON payloads](#post-json-payloads)
- [Handling XML responses](#handling-xml-responses)
- [Exception Handling](#exception-handling)
- [self signed certs](#self-signed-certs)
  - [Disable specifc warning for self-signed cert verification](#disable-specifc-warning-for-self-signed-cert-verification)
- [Links](#links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Information and how-to with the requests module

# Certificate Verification

## Method 1: valid SSL with CA via 'ssl'
Dyanamic detaction and setting for self-signed or externally signed (.e.g. Entrust) certificates:
```
import ssl
import socket

ctx = ssl.create_default_context()
s = ctx.wrap_socket(socket.socket(), server_hostname=ambari_srv)
s.connect((ambari_srv, 8443))
cert = s.getpeercert()
issuer = dict(x[0] for x in cert['issuer'])['commonName']
```

## Method 2: Reading content from public cert

You can use this in hdpcommon (rough draft). 
```
import json
import ssl
import OpenSSL

def get_cert(server, port):
        """ Collect remote server certificate details """
        # Docs: https://www.pyopenssl.org/en/stable/api/crypto.html
        # See also: https://www.programcreek.com/python/example/62606/ssl.get_server_certificate

        cert_obj = {}
        cert_obj[server] = {}
        cert_pem = ssl.get_server_certificate((server,port))
        cert_der = ssl.PEM_cert_to_DER_cert(cert_pem)
        x509 = OpenSSL.crypto.load_certificate(OpenSSL.crypto.FILETYPE_PEM, cert_pem)

        fingerprint = x509.digest('sha1')
        fingerprint = ':'.join(fingerprint[pos:pos+2] for pos in xrange(0,len(fingerprint),2))
        subject = x509.get_subject()

        # Build data
        cert_obj[server]['sha1_fingerprint'] = fingerprint
        cert_obj[server]['serial_number'] = x509.get_serial_number()
        cert_obj[server]['common_name'] = subject.CN
        cert_obj[server]['organization'] = subject.O
        cert_obj[server]['cert_issued'] = x509.get_notBefore()
        cert_obj[server]['cert_expire'] = x509.get_notAfter()
        cert_obj[server]['issuer'] = x509.get_issuer().commonName

        # Optional with arg? save cert pem
        #cert_out = open('cert.txt','wb')
        #cert_out.write(cert_pem)
        #cert_out.close() 

        return cert_obj

# Test
cert_dict = get_cert(host.domain.com',443)
print(json.dumps(cert_dict, indent = 4)) 
```

Sources:
* https://www.pyopenssl.org/en/stable/api/crypto.html
* https://www.programcreek.com/python/example/62606/ssl.get_server_certificate

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

# Exception Handling

You can either catch the base-class exception, which will handle all cases:

```
try:
    r = requests.get(url, params={'s': thing})
except requests.exceptions.RequestException as e:  # This is the correct syntax
    print e
    sys.exit(1)
```

Or you can catch them separately and do different things.

```
try:
    r = requests.get(url, params={'s': thing})
except requests.exceptions.Timeout:
    # Maybe set up for a retry, or continue in a retry loop
except requests.exceptions.TooManyRedirects:
    # Tell the user their URL was bad and try a different one
except requests.exceptions.RequestException as e:
    # catastrophic error. bail.
    print e
    sys.exit(1)
```

Exception docs: http://docs.python-requests.org/en/latest/user/quickstart/#errors-and-exceptions

# self signed certs

## Disable specifc warning for self-signed cert verification
This is provided you know it's ok internally.
```
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
```

# Links

* http://docs.python-requests.org/en/master/
* [Reading JSON from a file](http://stackabuse.com/reading-and-writing-json-to-a-file-in-python/)
