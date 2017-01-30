<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [WLAN tweaks](#wlan-tweaks)
  - [Disable Power Management](#disable-power-management)
- [Sources](#sources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# WLAN tweaks

## Disable Power Management
It is more than likely that the Pi will cut off the WLAN adapter connection after a certain amount of dormant time. For external access you probably want to turn this power saving mode off:

First you read the power management flag using :

```
cat /sys/module/8192cu/parameters/rtw_power_mgnt
```

This will report a value of “1”.

To set it to zero you can use :
```
sudo nano /etc/modprobe.d/8192cu.conf
```

and add the following line :

```
options 8192cu rtw_power_mgnt=0 rtw_enusbss=0
```

You are now ready to reboot using :

```
sudo reboot
```

**Options**

The two options we set in the configuration are rtw_power_mgnt and rtw_enusbss. If you are interested they take the values defined below :

```
rtw_power_mgnt
0 = disable power saving
1 = power saving on, minPS
2 = power saving on, maxPS
rtw_enusbss
0 = disable auto suspend
1 = enable auto suspend
So setting them both to zero disables “power saving” and “auto suspend”.
```

# Sources

* https://pimylifeup.com/raspberry-pi-webcam-server/
* https://www.raspberrypi.org/forums/viewtopic.php?t=61665
* http://forums.adafruit.com/viewtopic.php?f=50&t=44171&p=220622#p220593
