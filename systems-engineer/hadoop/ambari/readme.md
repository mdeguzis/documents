# Ambari

## Notable features

* Ambari 2.4+
  * Role-Based Access Control (RBAC) - provides granular control of the Ambari dashboard

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
