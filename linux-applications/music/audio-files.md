<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Convert WAV files to another format, such as MP3](#convert-wav-files-to-another-format-such-as-mp3)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Convert WAV files to another format, such as MP3

To mp3:
```
sudo apt-get install lame
for f in *.wav ; do lame "$f" ; done
```

Reference: http://www.savvyadmin.com/batch-mp3-encoding-with-linux-and-lame/

To FLAC:
```
flac --keep-foreign-metadata --best *.wav
```
