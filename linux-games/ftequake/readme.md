<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Music](#music)
  - [Soundtrack](#soundtrack)
  - [Title screen music](#title-screen-music)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About 

Notes regarding playing Quake via FTE Quake.

# Music

## Soundtrack

The original quake had a great soundtrack by Nine Inch Nails. Unfortunately, the Steam version does not come with the soundtrack files. The GOG-provided files need to be converted before they are ready for use. In general, you'll just need to move a "music" folder to the correct location within your vkQuake installation (.e.g `/usr/share/quake/id1/music`). Most Quake engines play nicest with soundtracks placed in the `id1/music` subfolder vs. `sound\cdtracks`

QuakeSpasm, the engine vkQuake is derived from, supports OGG, MP3, FLAC, and WAV audio formats. The Linux version of QuakeSpasm/VkQuake requires external libraries: libogg or libvorbis for OGG support, libmad or libmpg123 for MP3, and libflac for FLAC. If you already have a setup that works for the engine you're currently using, then you don't necessarily have to change it. 

To convert the WAV files to FLAC, run this command with libflac and sox installed in a directory containing the WAV files:
~~~
for f in *.wav; do sox "$f" "${f%.wav}.flac"; done
~~~

Generally, the below setup works for multiple engines, including Quakespasm/vkQuake:

* The music files are loose files, NOT inside a pak or pk3 archive.
* The files are placed inside a "music" subfolder of the "id1" folder. For missionpack or mod soundtracks, the files are placed in a "music" subfolder of the appropriate game folder. So the original Quake soundtrack files go inside "id1\music", Mission Pack 1 soundtrack files go inside "hipnotic\music", and Mission Pack 2 soundtrack files go inside "rogue\music".
* The files are named in the pattern "tracknn", where "nn" is the CD track number that the file was ripped from. Since the soundtrack starts at the second CD track, MP3 soundtrack files are named "track02.mp3", "track03.mp3", etc. OGG soundtrack files are named "track02.ogg", "track03.ogg", etc. FLAC soundtrack files are named "track02.flac", "track03.flac", etc. WAV soundtrack files are named "track02.wav", "track03.wav", etc.

**See more:** [Quake Soundtrack Solutions (Steam Community)](http://steamcommunity.com/sharedfiles/filedetails/?id=119489135)

## Title screen music

If you want to hear that badass song (the "main" theme from Trent Reznor) at the title screen, create a file called `autoexec.cfg`
inside id1/ that contains:

```
cd play music/track02.ogg
```

Adjust to your file path and file type accordingly.
