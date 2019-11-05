<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [OpenSSL: Check SSL Certificate Expiration Date and More](#openssl-check-ssl-certificate-expiration-date-and-more)
  - [Check SSL Certificate Expiration Date](#check-ssl-certificate-expiration-date)
  - [OpenSSL: Check SSL Certificate – Additional Information](#openssl-check-ssl-certificate--additional-information)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


[Source](https://www.shellhacks.com/openssl-check-ssl-certificate-expiration-date/ "Permalink to OpenSSL: Check SSL Certificate Expiration Date and More")

# OpenSSL: Check SSL Certificate Expiration Date and More

From this article you will learn how to connect to a website over `HTTPS` and check its SSL certificate expiration date from the Linux command-line.

Besides of validity dates, i'll show how to view who has issued an SSL certificate, whom is it issued to, its `SHA1` fingerprint and the other useful information.

Linux users can easily check an SSL certificate from the Linux command-line, using the `openssl` utility, that can connect to a remote website over `HTTPS`, decode an SSL certificate and retrieve the all required data.

**Cool Tip:** If your SSL certificate expires soon – you will need to generate a new CSR! In Linux this can be easily done with a simple one-liner! [Read more →][1]

## Check SSL Certificate Expiration Date

Run the following one-liner from the Linux command-line to check the SSL certificate expiration date, using the `openssl`:
    
    
    $ echo | openssl s_client -servername **NAME** -connect **HOST**:**PORT** 2>/dev/null | openssl x509 -noout -dates

Short explanation:

| ----- |
| Option |  Description |  
| `-connect HOST:PORT` |  The host and port to connect to. |  
| `-servername NAME` |  The TLS SNI (Server Name Indication) extension (website). | 

**Info:** Run `man s_client` to see the all available options.

As an example, let's use the `openssl` to check the SSL certificate expiration date of the `https://www.shellhacks.com` website:
    
    
    $ echo | openssl s_client -servername www.shellhacks.com -connect www.shellhacks.com:443 2>/dev/null | openssl x509 -noout -dates
    notBefore=Mar 18 10:55:00 2017 GMT
    notAfter=Jun 16 10:55:00 2017 GMT
    

## OpenSSL: Check SSL Certificate – Additional Information

Besides of the validity dates, an SSL certificate contains other interesting information. 

Each SSL certificate contains the information about who has issued the certificate, whom is it issued to, already mentioned validity dates, SSL certificate's `SHA1` fingerprint and some other data.

All these data can retrieved from a website's SSL certificate using the `openssl` utility from the command-line in Linux.

Check who has issued the SSL certificate:
    
    
    $ echo | openssl s_client -servername shellhacks.com -connect shellhacks.com:443 2>/dev/null | openssl x509 -noout -issuer
    issuer= /C=US/O=Let's Encrypt/CN=Let's Encrypt Authority X3

Check whom the SSL certificate is issued to:
    
    
    $ echo | openssl s_client -servername shellhacks.com -connect shellhacks.com:443 2>/dev/null | openssl x509 -noout -subject
    subject= /CN=www.shellhacks.com

Check for what dates the SSL certificate is valid:
    
    
    $ echo | openssl s_client -servername shellhacks.com -connect shellhacks.com:443 2>/dev/null | openssl x509 -noout -dates
    notBefore=Mar 18 10:55:00 2017 GMT
    notAfter=Jun 16 10:55:00 2017 GMT

Show the all above information about the SSL certificate, at once:
    
    
    $ echo | openssl s_client -servername shellhacks.com -connect shellhacks.com:443 2>/dev/null | openssl x509 -noout -issuer -subject -dates
    issuer= /C=US/O=Let's Encrypt/CN=Let's Encrypt Authority X3
    subject= /CN=www.shellhacks.com
    notBefore=Mar 18 10:55:00 2017 GMT
    notAfter=Jun 16 10:55:00 2017 GMT

**Cool Tip:** You can also decode an SSL certificate file if you have it locally, using the `openssl` utility from the Linux command-line! [Read more →][2]

Show the `SHA1` fingerprint of the SSL certificate:
    
    
    $ echo | openssl s_client -servername www.shellhacks.com -connect www.shellhacks.com:443 2>/dev/null | openssl x509 -noout -fingerprint
    SHA1 Fingerprint=26:F8:D5:E4:3E:7A:7B:7E:72:20:15:77:FE:C7:89:E7:E4:8A:15:CF

Extract the all information from the SSL certificate (decoded):
    
    
    $ echo | openssl s_client -servername www.shellhacks.com -connect www.shellhacks.com:443 2>/dev/null | openssl x509 -noout -text
    Certificate:
        Data:
            Version: 3 (0x2)
            Serial Number:
                03:86:f4:63:3d:34:50:a8:47:cc:f7:99:10:1f:79:1c:21:c8
        Signature Algorithm: sha256WithRSAEncryption
    [...]

Show the SSL certificate itself (encoded):
    
    
    $ echo | openssl s_client -servername shellhacks.com -connect shellhacks.com:443 2>/dev/null | openssl x509
    -----BEGIN CERTIFICATE-----
    MIIFGDCCBACgAwIBAgISA4b0Yz00UKhHzPeZEB95HCHIMA0GCSqGSIb3DQEBCwUA
    MEoxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MSMwIQYDVQQD
    ExpMZXQncyBFbmNyeXB0IEF1dGhvcml0eSBYMzAeFw0xNzAzMTgxMDU1MDBaFw0x
    [...]

Summary table:

| ----- |
| Option |  Description |  
| `-text` |  Prints out the certificate in text form. |  
| `-noout` |  Prevents output of the encoded version of the request. |  
| `-subject` |  Outputs the subject name. |  
| `-issuer` |  Outputs the issuer name. |  
| `-dates` |  Prints out the start and expiry dates of a certificate. |  
| `-fingerprint` |  Prints out the digest of the DER encoded version of the whole certificate. | 

**Info:** Run `man x509` to see the all available options.

[1]: https://www.shellhacks.com/create-csr-openssl-without-prompt-non-interactive/
[2]: https://www.shellhacks.com/decode-ssl-certificate/

  
