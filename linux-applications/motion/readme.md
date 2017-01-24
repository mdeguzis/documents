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

# Source

https://pimylifeup.com/raspberry-pi-webcam-server/
