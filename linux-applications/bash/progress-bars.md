<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Some examples](#some-examples)
- [touch tmpfile](#touch-tmpfile)
- [while [[ -f tmpfile ]];](#while---f-tmpfile-)
- [do](#do)
- [echo -n "."](#echo--n-)
- [sleep 2](#sleep-2)
- [done](#done)
- [rm tmpfile](#rm-tmpfile)

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
