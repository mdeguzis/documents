<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Ambari](#ambari)
  - [Notable features](#notable-features)
  - [Main Components](#main-components)
  - [Other components](#other-components)
  - [Commoon commands](#commoon-commands)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Ambari

## Notable features

* Ambari 2.4+
  * Role-Based Access Control (RBAC) - provides granular control of the Ambari dashboard

## About

 * Hadoop is configured by a collection of XML files
 * Ambari exposes these in the dashboard

## Main Components

* **Dashboard (Ambari)** - Primary UI for Hadoop operations
  * Heat maps
  * configs: useful metadata for installed/running services
* **Services**
  * Summary information
  * Manage configs / config profiles / config groups
* **Hosts** - Available hosts attached to the current Hadoop framework. Lists summmary information and lists installed components for each host
* **Alerts**
* **Admin**

## Other components

* Views
* Ambari management is located at: Admin/UserID > Manage Ambari

## Commoon commands

````
# Updates password
ambari-admin-password-reset
# If Ambari doesn't restart automatically, restart ambari service
ambari-agent restart
```
