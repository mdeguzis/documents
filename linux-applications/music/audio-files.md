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
