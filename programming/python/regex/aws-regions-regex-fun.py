#!/usr/bin/python3

import re

"""
Sometimes, AWS regions must be "simplified", be it lowercase, uppercase, or special characters (e.g. dashes) removed.
This exercise will demonstrate simplifying regions, then putting them back together again with regex

Using this regular expression with a substitution pattern like "\L1-\L2-\L3", you can transform "USEAST1" into "us-east-1" and "USISOBEAST1" into "us-isob-east-1".

Requirements:
    pip3 install boto3 awscli botocore

Regex description:

- \b : The beginning of a word boundary.
- ([A-Z]{2}) : Captures the first two uppercase letters as the country code.
- ([A-Z]+) : Captures one or more uppercase letters, representing the rest of the region.
- (\d+) : Captures one or more digits as the zone number.
- \b : The end of a word boundary.

Playground: https://regex101.com/r/rI2xoC/1
"""

pattern = re.compile(r'^([A-Z]{2})(ISO(B|F?))?([A-Za-z]+)(\d{1,2})$')

test_strings = [
    "USEAST1",
    "USISOBEAST1",
    "USISOEAST1"
]

'''
Example: = f"{match2.group(1).lower()}-{match2.group(2).lower()}-{match2.group(3)}"
Sample splices:
    >>> match.groups()
    ('US', None, None, 'EAST', '1')

    >>> match2.groups()
    ('US', 'ISOB', 'B', 'EAST', '1')

'''

# Testing
# Logic:
#   group 1: Always the country code, e.g. US
#   group 2: 4 parter match, e.g. ISO/ISOB/ISOF
#   group 3: The region
#   group 4: The region number
for string in test_strings:
    match = pattern.match(string)
    country_code = match.group(1)
    iso_code = match.group(2)
    region = match.group(4)
    region_num = match.group(5)

    print(f"String to test: {string}")
    print(f"Match groupings: {match.groups()}")

    if iso_code:
        region = f"{country_code}-{iso_code}-{region}-{region_num}".lower()
    else:
        region = f"{country_code}-{region}-{region_num}".lower()

    print(f"Region (deconstructed): {region}\n")

