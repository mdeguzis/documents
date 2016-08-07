<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [Quake 1](#quake-1)
  - [TyrQuake](#tyrquake)
  - [QuakeSpasm](#quakespasm)
  - [vkQUake](#vkquake)
  - [Darkplaces](#darkplaces)
  - [Quore](#quore)
  - [QuDos Quake Ports](#qudos-quake-ports)
  - [Tenebrae](#tenebrae)
  - [QuakeForge](#quakeforge)
  - [NPRQuake](#nprquake)
  - [Audio Quake](#audio-quake)
  - [SDL Quake](#sdl-quake)
  - [wmQuake](#wmquake)
- [Engines for Quake sequels](#engines-for-quake-sequels)
  - [Hexen II](#hexen-ii)
  - [Quake II](#quake-ii)
  - [Quake III Arena](#quake-iii-arena)
  - [Quake IV](#quake-iv)
- [Multi-engine](#multi-engine)
- [Refernces](#refernces)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Next Previous Contents
3. Game Engines

# Quake 1

## TyrQuake

TyrQuake is a fairly complete project including OpenGL, Software Quake and QuakeWorld clients, and other tools including the popular TyrLite. Tyrann's focus is on a fully featured but minimalist cross-platform engine.
The latest version is 0.60, which now supports the Power PC platform, FreeBSD and per-user configuration files. Other newish features include sophisticated command line completion, and a cool console effect (gl_constretch).
Typing make will build all the clients. To compile only the single player client, after unpacking the source code type: make prepare tyr-glquake . Tyrann has a nice clean build system, but if you wish to see compilation feedback, add V=1 to the command line.

A patched TyrQuake binary is available here.

http://disenchant.net/engine.html


## QuakeSpasm

FitzQuake has long been the defacto standard for the Quake mapping community, and this new project is based on the SDL Port of Fitz.

Features

As well as great FitzQuake features such as skyboxes, fog, coloured light, and support for huge maps, QuakeSpasm includes:

64 bit CPU support
Should work with most SDL platforms
Restructured sound driver
Custom console background
SDL CD audio
Tweaked command line completion, and a map name autocomplete
Alt+Enter toggles fullscreen
Tips

scr_sbaralpha .99 - Give a nicer status bar
maps - List available maps
game GAMENAME - On-the-fly change of game
./quakespasm -fitz - Run game in FitzQuake mode
http://quakespasm.sourceforge.net

## vkQuake

Port of Quakespasm to the Vulkan API. See: https://github.com/Novum/vkQuake. Packages available at packages.libregeek.org.

## Darkplaces

Darkplaces is an amazing Quake engine with a great range of visual enhancements and options for colour, effects and sound. It uses the same Doom3 lighting features as Tenebrae and thus requires a more powerful computer than GLQuake and QuakeForge.
It also supports many otherwise incompatible mods including Nehahra and Nexuiz, and has improved support for the official mission packs. Recent changes include improvements to the menuing system, and speed increases, though there also appears to be some mod compatability issues creeping in.
Havoc's file archive can be a little confusing. The large "darkplacesengine" tarballs include precompiled binaries and the game's source code in a second tarball. To compile your own program uncompress the second tarball , type make to see a list of possible targets (programs), and select one. For example - to build the OpenGL engine with ALSA sound type make cl-release, or to build with OSS sound, make cl-release DP_SOUND_API=OSS.
Thanks to LordHavoc for this great project.
http://www.icculus.org/twilight/darkplaces

## Quore

From the Quore website:

Quore is an atmospheric Quake engine running on GNU/Linux systems with enhanced graphics, increased limits, configurable HUD and ambiences, and different modes for changing the gameplay. It is based on JoeQuake with additional effects from Qrack, ezQuake and engine's limits tweaking from Fitzquake
This game is great, and probably the most graphically modified Linux engine. But it also has many niggling bugs.
http://quore.free.fr/index.html


## QuDos Quake Ports

QuDos has done much work with Quake engines for BSD and Linux. In the past he has ported Nehahra , JoeQuake and others, but currently has only a couple available at his website.
His excellent NehQuake port is still available at LinuxQuake.Org , but those after the source code may try contacting him.

http://qudos.quakedev.com/linux/quake1

3.6 MFCN's GLQuake

Here you'll find some relevant documentation and trouble shooting tips, and a basic version of OpenGL Quake for Linux. Fairly pain free by Linux standards, it supports most Quake mods, but gamma (brightness) support is broken.

http://mfcn.ilo.de/glxquake

## Tenebrae

Tenebrae is a gorgeous Quake engine with lighting similar to that in Doom III. It's is an old project requiring a good GPU, and may not be compatible with all... the documentation is a fairly sparse.
There are several points of interest here...

Tenebrae has an "easter egg". In the quit game dialog press "d".
It includes the interesting "bumptest" and "zoo" maps.
A custom Tenebrae-1.0 engine is included with the atmospheric Industri mod.
Tenebrae doesn't run user mods.
The Tenebrae installer will install the shareware Quake levels, and all fancy Tenebrae models and textures, but is a 100 meg download. (Make sure to run the game in 32 bpp mode - see below). Try here for some binaries.

Compilation of the source code may not be straight forward. Firstly:

cd linux ; ln -s Makefile.i386linux Makefile ; make
If compilation fails with "../glquake.h:1137: conflicting types for ....", lines 1137 and 1138 need removing. You may also have to change the gethostname declaration in net_udp.c thus:
- extern int gethostname (char *, int);
+ extern int gethostname (char *, size_t);
After compilation, copy the binary "debugi386.glibc/bin/tenebrae.run" and the Tenebrae data files to your Quake folder. Finally, the game only runs in 32 bpp colours (X11 colour depth 24), so restart X in this mode if you have to, and execute the game with: tenebrae.run -basedir $PWD. Alternatively you can start a new X session with the command:

startx $PWD/tenebrae.run -basedir $PWD -- :1 -depth 24
http://tenebrae.sourceforge.net/


## QuakeForge

QF is a comprehensive Linux Quake project. It has elegant graphical enhancements, numerous single player and QuakeWorld clients and Quake C tools. Amongst it's features are: an overhauled menuing system, a new "heads up display", and in-game help.
Possibly because of it's size, QuakeForge hasn't been updated in years and it's documentation was never quite finished. The usual "configure && make && make install" will build the whole project, but it does not appear to support a minimal single player build option. QuakeForge's default directory is "/usr/local/share/games/quakeforge", so ensure to link to your "id1" directory from here. (For example ln -s /usr/local/games/quake/id1 /usr/local/share/games/quakeforge/id1).
For information about building QuakeForge on the BSD Unices, see the FreeBSD section.

Kudos to the QuakeForge team for a huge project which has provided much inspiration for other open source games.

http://www.quakeforge.net
http://sourceforge.net/projects/quake/


## NPRQuake

Another Quake engine which has been ported to Linux but, as far as I know, hasn't been touched in a few years is NPRQuake. Notably, it has the ability to load different renderers on the fly, which is pretty cool. The Linux port includes support for the cartoon renderer ainpr, and works really well for me.

The SDL version has rewritten mouse and video code, but the sound APIs have not been ported to SDL, and it is not a fully portable engine.

http://www.cs.wisc.edu/graphics/Gallery/NPRQuake/

3.10 Twilight Project

The Twilight Project "is a set of rather minimalist NQ and QW engines that focus on insane rendering speed, it is however a bit unstable at the moment."

This game is ~quick~, with a plain looking, but useful menu system, so users with a slow computer should definitely give this a go. It also has some unique graphical effects and an unusual user interface.

To compile version 0.2.2 of this project, you'll need the python scripting language installed, and perhaps to make this change to src/nq/pr_edict.c , line 1108:

-               if (progs->ofs_strings + pr_stringssize >= com_filesize)
+               if (progs->ofs_strings + pr_stringssize >= (uint)com_filesize)
Executing scons.py will now (hopefully) build the binaries, and after copying the single player client (twilight-nq) to your quake directory, type twilight-nq -basedir $PWD to start the game.
If you're having trouble with compilation, version 0.2.01 uses the traditional "configure && make && make install" method, so you may want to try it.

Game saves are an issue with this engine. There are no game save or load menus, and this can only be done using the "F6" and "F9" keys to quicksave and load. Additionally, this feature often won't work if you started with the "map MAPNAME" command, so make sure you begin games in a normal fashion, through the "Start Game" menu.

http://icculus.org/twilight

## Audio Quake

This engine is for visually disabled people, and uses sound to help with navigation. It includes OpenGL and SDL clients.

http://www.agrip.org.uk/


## SDL Quake

This basic version of Quake is not really of interest to Linux users as it uses a very old code base, and has few features. It's main feature is the use of the SDL programming API for sound, video and mouse handling, and should run on all SDL supported operating systems without major changes.

SDL Quake does have a bug relating to music: running the game with an audio CD in the drive will limit the game's speed. To avoid this simply remove the CD, or use the -nocdaudio option.

The game runs at a fixed resolution; the width and height can't be changed. To play in fullscreen mode, use the -fullscreen option.

http://www.libsdl.org/projects/quake

## wmQuake

WindowMaker is a window manager for X11, and this tiny version of Quake fits in an 64x64 pixel dockable applet. You can test it out even if you don't have WindowMaker, but the game will crash if it gets keyboard focus.

For the curious, this game can be benchmarked with timedemo demo1 after removing the "usleep" commands from sys_linux.c.

http://freshmeat.net/projects/wmquake/

3.14 Software Quake

For a more in-depth treatment of Software Quake, see the previous version of this how-to.

The original WinQuake source also came with two pixelated versions of the game:

X Quake (quake.x11)
Svga Quake (squake)
but compiling them is no longer straight forward. It involves copying Makefile.linux to Makefile, editing this file to remove the extra targets , replacing /usr/X11/lib with /usr/X11R6/lib and typing make build_release.

There are easier options though. TyrQuake and QuakeForge have software clients, and there is also an old SDLQuake written by SDL's author, Sam Lantinga, which should work on all modern platforms.

Next Previous Contents

# Engines for Quake sequels

Next Previous Contents
6. Quake Sequels

## Hexen II

Hexen II is a colourful adaption of the Quake engine, and in terms of source code and theme is much closer than Quake II to the original game. Unfortunately, Raven Software released the game with many rough edges... So beautiful, yet so cruel.

Hammer of Thyrion is the main Linux Hexen II port , and has had much work done towards squishing bugs and enhancing the OpenGL graphics. While it is not as widely distributed as Quake, the HoT demo includes some of the game's best levels and is available from the Sourceforge project page.

Mappers should note the Quest world editor, and HexenC compiler FTEQCC.

##  Quake II

Quake II is the sci-fi themed sequel to Quake. Early Linux releases weren't very solid, especially the mouse handling, but there is now a few related projects to choose from.

Open Source Projects
QuDos' Quake II is the most notable. It is based on Icculus Quake II, and includes some beautiful graphical enhancements - including cell shading - and support for FreeBSD and XMMS plugins. Another project still in development is Quetoo which has speed and security enhancements, but also a very stripped back interface and a few bugs.

Yamagi Quake II, also based on Icculus, is an active Q2 project focusing on single player game and cooperative game modes. **Available in the Debian repos as `yamagi-quake2`**

Qfusion appears an interesting project... that's slipped under my radar till now. An advanced multipurpose engine based on Quake II.

Older projects include Michael Olson's source and binary rpms (which appear to be based on an old Icculus release) and the QuakeForge Quake II project with support for multiple operating systems. On a slightly different note - the Jake2 project is a version of Quake II written in Java.

Notes
A common command line option is: 
+set vid_ref glx +set gl_driver /usr/lib/libGL.so.1 
which tells the game to start in OpenGL mode.

See the old version of this how-to for other Quake II troubleshooting tips.

Mods
Digital Paint 2 is an "original" multiplayer game based on the Quake II engine. It's colourful and fun nature is a departure from the usual dark tone of most Quake games. Being a totally remodeled game, it doesn't require you to have the original Quake II ;->.

Argonium is a slick looking deathmatch mod which is also freely distributable.

## Quake III Arena

Quake III was one of the first games to receive a full Linux commercial release. It's a great game which more than survives. Mods are numerous, and of better visual quality than Quake I or II. For more info about installing the game, try idsoftware's Faq, or Linuxgamer's Quake III How-To.

The retail add-on Quake III Team Arena is supported and, despite getting ordinary reviews, is a great game. Most user mods should work with Linux. The Linux Gamers FAQ reports:

    Yes, ... modifications work in Linux as long as they are compiled to the
    Quake III ... VM bytecode as advised by id software.  ...  modifications
    compiled to Windows library files will not work.
Open Source Projects
The Icculus Quake III Project which has recently moved to IOQuake. They are adding extra features, including support for Star Trek Voyager: Elite Force Holomatch (multiplayer).

Sourceforge Quake III - Cell Shading

Mods
Warsow is a cell-shaded cartoon style total conversion using a heavily modified engine. It's interface is very slick, graphics to die for, and gameplay is ok.

World of Padman is a high quality stand-alone conversion. It's set in a miniature suburban world with a bizarre cartoon theme, and is currently multiplayer only but with full bot support.

In Alien Arena you're matched against pin headed martians in unbelievable OpenGL environments.

The Dark Conjunction is an atmospheric Q3 single player conversion.

Try the alien themed Tremulous for an original multiplayer mod.

Links
The Zerowing installation and known issues guides hosted by id Software.

Linuxgamer's Quake III How-To.

Linux Questions' Quake III forums for Sound and Mouse problems.

All things Quake III at Planet Quake

## Quake IV

Quake IV is an epic FPS from Raven Software. It is based on the Doom-III engine and has high hardware specs: A 2GHz P4 (or AMD equivalent) and 512meg ram are the official minimum requirements. It's a beautiful game which should really be played with the graphical settings set to "medium" or "high". For this reason the author recommends against using entry level cards such as the FX5200.

The game runs well under Linux, but still has a couple of issues:

Quake IV only runs in 32 bpp colours (X11 colour depth 24), so restart X in this mode if you have to. Attempting to run in 16 bpp colours will give you an error message like: Couldn't find matching GLX visual ..... Sys_Error: Unable to initialize OpenGL. Alternatively you can start a new X session with the command:
startx `which quake4` -- :1 -depth 24
The Alsa sound libraries are used by default. To start with OSS sound , type:
quake4 +set s_driver oss
The Quake IV DVD Edition comes with several promotional movies. Although the movies appear to be Windows executables, they are in fact Bink videos, and can be viewed with the Linux Bink Player.
Quake IV Links
The Official Linux Faq

Linux Questions Quake IV bug forums

Quake IV demo

Linux 1.4.2 SDK installer

Next Previous Contents

# Multi-engine

# Refernces

* [Quaddicted list of engines](https://www.quaddicted.com/quake/recommended_engines)
