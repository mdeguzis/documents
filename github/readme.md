<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Tips and Tricks](#tips-and-tricks)
  - [Cloning all of organization repos with an OAuth Token](#cloning-all-of-organization-repos-with-an-oauth-token)
- [Guides](#guides)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Useful docs about GitHub.

# Tips and Tricks

## Cloning all of organization repos with an OAuth Token

After you generate a token under your profile settings:
```
#!/bin/bash

scriptdir=$(pwd)
arg1="$1"
token="<REDACTED>"

for i in `curl -u mtdeguzis:$token \
    -s "https://api.github.com/orgs/GeisingerHealthSystem/repos?per_page=200" \
    |grep clone_url | cut -d ':' -f 2-3|tr -d '",'|awk -F'/' '{print $4"/"$5}'`;
do
    #echo $i;
    gitdir=$(echo $i | awk -F'/' '{print $2}' | sed 's/.git//')
    if [[ -d $gitdir ]]; then
        if [[ $arg1 != "-f" ]]; then
            echo -n "Git dir already exists, remove [y/n]?: "
            read response
            if [[ $response == "y" ]]; then
                rm -rf $gitdir
                git clone https://$token@github.com/$i
            else
                echo "Bailing out..."
                exit 1
            fi
        else
            echo "Removing and recloning $gitdir"
            rm -rf $gitdir
            git clone https://$token@github.com/$i
        fi
    else
        if ! git clone https://$token@github.com/$i; then
            echo "Clone failed, check output"
            exit 1
        fi
    fi

```

# Guides

* [Sync repository and wiki](https://coderwall.com/p/3aamsa/sync-documentation-between-source-and-wiki-on-github)

