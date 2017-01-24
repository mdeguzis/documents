<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Setting up motion on a Raspberry Pi 2](#setting-up-motion-on-a-raspberry-pi-2)
  - [Update](#update)
  - [Install motion](#install-motion)
  - [Edits to `/etc/motion/motion.conf`](#edits-to-etcmotionmotionconf)
  - [Check owner on capture directory](#check-owner-on-capture-directory)
  - [Setup up the daemon, first we need to edit the motion file](#setup-up-the-daemon-first-we-need-to-edit-the-motion-file)
- [Operations](#operations)
  - [Start the service](#start-the-service)
  - [Stop the service](#stop-the-service)
- [Connecting](#connecting)
- [Source](#source)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Setting up motion on a Raspberry Pi 2

## Update
```
sudo apt-get update
sudo apt-get upgrade
```

## Install motion
```
sudo apt-get install motion
```
## Edits to `/etc/motion/motion.conf`

* Change the target capture directory to an easier location to manage (.e.g. `target_dir /home/pi/motion-capture1)
* daemon on
* webcam_localhost off
* Optional (Don’t include the text in brackets)
* webcam_maxrate 100 (This will allow for real-time streaming but requires more bandwidth)
* framerate 100 (This will allow for 100 frames to be captured per second allowing for smooth video)
* width 640 (This changes the width of the image displayed)
* height 480 (This changes the height of the image displayed)
* (optional) Add authentication

## Check owner on capture directory

This directory needs to be at least group-owned by the motion group, or add your user to the motion group.
```
drwxrwx---  2 motion motion 81920 Jan 24 01:42 motion-capture
```

## Setup up the daemon, first we need to edit the motion file
```
sudo nano /etc/default/motion
...
start_motion_daemon=yes
```

# Operations

## Start the service
```
sudo service motion start
```

## Stop the service
```
sudo service motion stop
```

# Connecting

Now to test it out! We can check out the Raspberry Pi Web Cam Stream at the ip address of our Pi so in your browser go to the following address:
```
<RASPI_IP>:8081
```

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

>rtw_power_mgnt
0 = disable power saving
1 = power saving on, minPS
2 = power saving on, maxPS
rtw_enusbss
0 = disable auto suspend
1 = enable auto suspend
So setting them both to zero disables “power saving” and “auto suspend”.

# Sourcea

* https://pimylifeup.com/raspberry-pi-webcam-server/
* https://www.raspberrypi.org/forums/viewtopic.php?t=61665
* http://forums.adafruit.com/viewtopic.php?f=50&t=44171&p=220622#p220593
