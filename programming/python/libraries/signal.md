# Set timeout for block of code

```
# Alarm handler for subprocess timeouts
def handler(signum, frame):
    raise Exception("subprocess command timed out")

    # Check for sudo init
    try:
        signal.signal(signal.SIGALRM, handler)
        signal.alarm(2)
        subprocess.call(['sudo', '-v'], stdout=open('/dev/null', 'w'))

    except Exception: 
        self.skipTest("ERROR: Sudo initialization is required")
```
Source: https://stackoverflow.com/questions/492519/timeout-on-a-function-call
