<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Some examples](#some-examples)
- [echo -n "."](#echo--n-)
- [sleep 2](#sleep-2)
- [](#)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Some examples

#touch tmpfile

#while [[ -f tmpfile ]];
#do
#    echo -n "."
#    sleep 2
#
#done

mv "${HOME}/temp-log.txt" "${LOG_FILE}"

#rm tmpfile
