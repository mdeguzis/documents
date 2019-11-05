<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Michal Zuber - poznatky, návody a skúsenosti: Couldn't find cacert.pem & irssi SSL struggling](#michal-zuber---poznatky-n%C3%A1vody-a-sk%C3%BAsenosti-couldnt-find-cacertpem--irssi-ssl-struggling)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


[Source](http://michalzuber.blogspot.com/2014/02/couldnt-find-cacertpem-irssi-ssl.html "Permalink to Michal Zuber - poznatky, návody a skúsenosti: Couldn't find cacert.pem & irssi SSL struggling")

# Michal Zuber - poznatky, návody a skúsenosti: Couldn't find cacert.pem & irssi SSL struggling

I was setting up _irssi_ to connect via SSL so I needed a [CA (Certificate Authority)][1] bundle.  
I couldn't find it in /etc/ssl/certs (it was empty), in tutorials this path was mentioned, maybe Linux convention :)

I was reading _ _and found enlightment :)  
**wget http://curl.haxx.se/ca/cacert.pem**_ _so I downloaded it and watched into it.

On the 2nd row there was the following   

    
    
    # ca-bundle.crt -- Bundle of CA Root Certificates
    

  
From curiosity I tried **locate ca-bundle** and the following output came: 
    
    
    /opt/local/share/curl/curl-ca-bundle.crt
    /opt/local/share/doc/curl/html/mk-ca-bundle.html
    /opt/local/share/doc/curl/pdf/mk-ca-bundle.pdf
    /opt/local/share/doc/mutt/samples/ca-bundle.crt
    /opt/local/share/ncat/ca-bundle.crt
    

From experience /opt/local is the standard [macports][2] install (--prefix) path directory so I checked 
    
    
    mike@mikembp:~$ ls -l /opt/local/etc/openssl/
    total 32
    lrwxr-xr-x  1 root  admin    40B Feb  2 01:21 cert.pem@ -> /opt/local/share/curl/curl-ca-bundle.crt
    drwxr-xr-x  9 root  admin   306B Jan 11 12:55 misc/
    -rw-r--r--  1 root  admin    11K Jan  7 08:34 openssl.cnf
    

After some playing around to get some insight I found the _trust_ command 
    
    
    mike@mikembp:~$ trust
    usage: trust command ...
    
    Common trust commands are:
      list             List trust or certificates
      extract          Extract certificates and trust
      extract-compat   Extract trust compatibility bundles
      anchor           Add, remove, change trust anchors
    
    See 'trust  --help' for more information
    

So without internet connection I can still have outdated CA bundle with the following command 
    
    
    mike@mikembp:~$ trust extract --format=openssl-bundle --comment -f cacert.pem
    

irssi was screaming SSL warning on me without CA bundle 
    
    
    = 08.084055 [freenode] |-INFO > Irssi: Connection lost to irc.freenode.net
    = 08.084055 |-INFO > Irssi: warning Could not verify SSL servers certificate: unable to get local issuer certificate
    = 08.084055 |-INFO > Irssi: warning   Subject : /serialNumber=A7/cAN-TICcVTifiF1F5wuRPLpK75-AJ/C=US/ST=California/L=Mountain View/O=Mozilla Corporation/CN=irc.mozilla.org
    = 08.084055 |-INFO > Irssi: warning   Issuer  : /C=US/O=GeoTrust, Inc./CN=GeoTrust SSL CA
    = 08.084055 |-INFO > Irssi: warning   MD5 Fingerprint : FC:A1:52:CF:D9:97:2B:3D:55:F5:4A:2F:7C:10:99:69
    

Or connecting to port 7000 
    
    
    = 08.085921 |-INFO > Irssi: warning Could not load CA list for verifying SSL server certificate
    = 08.085921 |-INFO > Irssi: Unable to connect server irc.freenode.net port 7000 [Operation now in progress]
    
    
    
    mike@mikembp:/etc/ssl/certs$ sudo wget http://crt.gandi.net/GandiStandardSSLCA.crt
    Password:
    --2014-02-08 08:51:51--  http://crt.gandi.net/GandiStandardSSLCA.crt
    Resolving crt.gandi.net (crt.gandi.net)... 178.255.83.2, 2a02:1788:2fd::b2ff:5302
    Connecting to crt.gandi.net (crt.gandi.net)|178.255.83.2|:80... connected.
    HTTP request sent, awaiting response... 200 OK
    Length: 1191 (1.2K) [application/x-x509-ca-cert]
    Saving to: 'GandiStandardSSLCA.crt'
    
    mike@mikembp:/etc/ssl/certs$ sudo wget http://www.instantssl.com/ssl-certificate-support/cert_installation/UTN-USERFirst-Hardware.crt
    --2014-02-08 08:53:41--  http://www.instantssl.com/ssl-certificate-support/cert_installation/UTN-USERFirst-Hardware.crt
    Resolving www.instantssl.com (www.instantssl.com)... 199.66.206.224, 2a02:1788:4fd:ce::c742:cee0
    Connecting to www.instantssl.com (www.instantssl.com)|199.66.206.224|:80... connected.
    HTTP request sent, awaiting response... 200 OK
    Length: 1630 (1.6K) [application/x-x509-ca-cert]
    Saving to: 'UTN-USERFirst-Hardware.crt'
    

Converting CRT to PEM as mentioned at  didn't help 
    
    
    mike@mikembp:~$ openssl x509 -inform der -outform pem  GandiStandardSSLCA.pem
    mike@mikembp:~$ sudo mv GandiStandardSSLCA.pem /etc/ssl/certs/
    

I tried downloading the certificates with Firefox  

![][3]

  
Output of SSL connection 
    
    
    mike@mikembp:~$ **openssl s_client -CApath /etc/ssl/certs/ -connect irc.freenode.net:6697**
    CONNECTED(00000003)
    depth=1 /C=FR/O=GANDI SAS/CN=Gandi Standard SSL CA
    verify error:num=20:unable to get local issuer certificate
    verify return:0
    ---
    Certificate chain
     0 s:/OU=Domain Control Validated/OU=Gandi Standard Wildcard SSL/CN=*.freenode.net
       i:/C=FR/O=GANDI SAS/CN=Gandi Standard SSL CA
     1 s:/C=FR/O=GANDI SAS/CN=Gandi Standard SSL CA
       i:/C=US/ST=UT/L=Salt Lake City/O=The USERTRUST Network/OU=http://www.usertrust.com/CN=UTN-USERFirst-Hardware
    ---
    Server certificate
    -----BEGIN CERTIFICATE-----
    MIIE5TCCA82gAwIBAgIQPAK59bPbZcCxzaKLiC8OjTANBgkqhkiG9w0BAQUFADBB
    MQswCQYDVQQGEwJGUjESMBAGA1UEChMJR0FOREkgU0FTMR4wHAYDVQQDExVHYW5k
    aSBTdGFuZGFyZCBTU0wgQ0EwHhcNMTQwMTEzMDAwMDAwWhcNMTUwMTE0MjM1OTU5
    WjBiMSEwHwYDVQQLExhEb21haW4gQ29udHJvbCBWYWxpZGF0ZWQxJDAiBgNVBAsT
    G0dhbmRpIFN0YW5kYXJkIFdpbGRjYXJkIFNTTDEXMBUGA1UEAxQOKi5mcmVlbm9k
    ZS5uZXQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDVuq/Gyqk79Uyp
    CZvlGv4ROFrZy4/bnZCI3Y9eGmgPz3oEhiyi5La3+e/QdxhAvY4Cr6E6yAOcnQrF
    99YxTfAy5J4t5p6clPfIbYf2iegwZpOjOP94N+MQrgH/sw+lD1Ue3y2SGbjhnEt4
    Mc+78jFvbcQilTpZ8ncGe+eDWfp5e6Z3pdel5MyNDRHcRVKhHNcCNZ4v3hldDu0s
    Qo9Vd63WM5Hiaqpbt6YusOMTZ/bfNUuRrHOdTgBQ27w1vkwjwUbudK1ZqBlYuKES
    jEBtJxWxS4JvXw2XLMw3kqH+TrYoCypfJTuhZkEa8nGimJ63j1cPTz7G/IJ9ktKk
    JvmTU4EFAgMBAAGjggG2MIIBsjAfBgNVHSMEGDAWgBS2qP+iqC/Qps1LsWjz51AQ
    Mad5ITAdBgNVHQ4EFgQUc6PotnJGCOnbZIXwlz9oO+61JB0wDgYDVR0PAQH/BAQD
    AgWgMAwGA1UdEwEB/wQCMAAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMC
    MGAGA1UdIARZMFcwSwYLKwYBBAGyMQECAhowPDA6BggrBgEFBQcCARYuaHR0cDov
    L3d3dy5nYW5kaS5uZXQvY29udHJhY3RzL2ZyL3NzbC9jcHMvcGRmLzAIBgZngQwB
    AgEwPAYDVR0fBDUwMzAxoC+gLYYraHR0cDovL2NybC5nYW5kaS5uZXQvR2FuZGlT
    dGFuZGFyZFNTTENBLmNybDBqBggrBgEFBQcBAQReMFwwNwYIKwYBBQUHMAKGK2h0
    dHA6Ly9jcnQuZ2FuZGkubmV0L0dhbmRpU3RhbmRhcmRTU0xDQS5jcnQwIQYIKwYB
    BQUHMAGGFWh0dHA6Ly9vY3NwLmdhbmRpLm5ldDAnBgNVHREEIDAegg4qLmZyZWVu
    b2RlLm5ldIIMZnJlZW5vZGUubmV0MA0GCSqGSIb3DQEBBQUAA4IBAQAUJNxQB+ui
    agYe5vkeEW27w4+O9eoTmzVoecAYs04HPrc8eMtpdUW2HUxVLi0sJNYLANS5YiV9
    Bba1Sdk5c2dN7KjCuvtJYC0Bjbvk1HjXOHieMmZGe6GKoG0UVYgSekOOAQLE8OED
    DC2DapvP22Zmx6kjf6LSp/C3oW8wT5Dc7x0pCCuRNRzOMbZ3pv+jINovexmoABTQ
    8y/7pYz+yVTuDx0yogl/+m3+d4p2YVhnm2eJyMLoGB/Vkw+kgsKDuntLWpDNDO6H
    Dw7kPAPlXGNaqyncGiJTnY0u6QqJft5CZLmzTml+X4JMFDqdctXCCyAeEV4oe0tD
    t04HEAoub+H+
    -----END CERTIFICATE-----
    subject=/OU=Domain Control Validated/OU=Gandi Standard Wildcard SSL/CN=*.freenode.net
    issuer=/C=FR/O=GANDI SAS/CN=Gandi Standard SSL CA
    ---
    No client certificate CA names sent
    ---
    SSL handshake has read 3162 bytes and written 340 bytes
    ---
    New, TLSv1/SSLv3, Cipher is DHE-RSA-AES256-SHA
    Server public key is 2048 bit
    Secure Renegotiation IS supported
    Compression: NONE
    Expansion: NONE
    SSL-Session:
        Protocol  : TLSv1
        Cipher    : DHE-RSA-AES256-SHA
        Session-ID: 79702A9A129FAEEBFE1C78DCBB8692D7E3235C61197C06157CF3679E628C1153
        Session-ID-ctx:
        Master-Key: 8AF72A2403FD491437296F3FD2F33F7B352F89A59D5078D6B5A8F4ACECA887B1F55A9894D7F9B8540C7EE15C697502AF
        Key-Arg   : None
        Start Time: 1391853886
        Timeout   : 300 (sec)
        Verify return code: 0 (ok)
    ---
    :sendak.freenode.net NOTICE * :*** Looking up your hostname...
    :sendak.freenode.net NOTICE * :*** Checking Ident
    :sendak.freenode.net NOTICE * :*** Your forward and reverse DNS do not match, ignoring hostname
    :sendak.freenode.net NOTICE * :*** No Ident response
    

[1]: https://en.wikipedia.org/wiki/Certificate_authority
[2]: https://www.macports.org/
[3]: http://1.bp.blogspot.com/-kAtNg0wCZpU/UvX6Vn5QWPI/AAAAAAAAKyg/mybxqo17Tbc/s320/Screen+Shot+2014-02-08+at+9.10.43+AM.png

  


Source: http://michalzuber.blogspot.com/2014/02/couldnt-find-cacertpem-irssi-ssl.html
