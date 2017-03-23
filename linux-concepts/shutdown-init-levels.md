# What is the difference between the shutdown, halt and reboot commands?

halt brings the system down to its lowest state, but leaves it powered on.

shutdown brings the system down to its lowest state, and will turn off power (soft power switch) if it can. Most computers now can do so.

reboot restarts the system. It brings the system down to its lowest state, then starts it up again.

Which to do depends on what you want to do.  halt is usually to get to a state where you can perform low level maintenance. shutdown is to power the system off, and reboot is to reboot it.
