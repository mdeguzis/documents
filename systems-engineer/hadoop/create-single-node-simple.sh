#!/bin/bash

# TODO - finish it

SCRIPTDIR="${PWD}"

###################################
# Components
###################################
#
#    Hadoop Common – it contains the Java libraries and utilities needed by other Hadoop modules.
#    HDFS – Hadoop Distributed File System – A Java based scalable file system distributed across multiple nodes.
#    MapReduce – YARN framework for parallel big data processing.
#    Hadoop YARN: A framework for cluster resource management.
#

###################################
# System configs
###################################

#######################
# Set host info and env
#######################

# You can use "master" to be more in line with hadoop conventions
hostnamectl set-hostname centos7

# Add to /etc/hosts
echo -e "\nPlease remember to add your IP address and FQDN to /etc/hosts!"
sleep 5s
sudo vim /etc/hosts

###############################
# Ensure Java SDK is installed
###############################

JAVA_VER=$(java -version 2>&1 | head -n 1 | awk -F '"' '{print $2}')
JAVA_CHECK="$(echo ${JAVA_VER} | grep "1.8" )"

if [[ "${JAVA_CHECK}" == "" ]]; then

	echo -e "Java 1.8.x does not seem to be installed, attempting install"
	sudo yum install java-1.8.0-openjdk

	# Check again
	if [[ "${JAVA_CHECK}" == "" ]]; then

		echo -e "Could not install Java 1.8.x, exiting"
		sleep 3s && exit 1

	fi

fi

####################
# Configure java ver
####################

echo -e "\nConfiguring Java alternatives. Please set the appropriate version"
sleep 2s
sudo alternatives --config java

# Create a new user account without root privledges for Hadoop

if [[ ! -d "/opt/hadoop" ]]; then

	# clean out any left over mail dir
	sudo rm -f "/var/spool/mail/hadoop"

	# Add user
	sudo useradd -d /opt/hadoop hadoop
	sudo passwd hadoop

else

	echo "User /opt/hadoop exists! Installation may or may not complete!"

fi

# Configure .bashrc for the hadoop user
# Just configure hadoop vars for now, as CentOS 7 has Java 8
cat "${SCRIPTDIR}/hadoop_env_vars.txt" | sudo tee -a "/opt/hadoop/.bashrc"

# Download and unpack hadoop

#
# TODO, have errands to do :)
#
