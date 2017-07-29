# About

This folder tree / page hold information for building / distributing / troubleshooting Flatpak.

# Builds

See: https://github.com/mdeguzis/libregeek-packaging

# Example build

## Details

* Package: Mr. Boom
* SDK: org.gnome.Sdk
* SDK version: 3.24
* Runtime: org.gnome.Platform
* Sourced from: http://docs.flatpak.org/en/latest/building-simple-apps.html

##  Build format
```
flatpak build-init DIRECTORY APPNAME SDK RUNTIME [BRANCH]
```

* **DIRECTORY** is the name of the directory that will be created to contain the application
* **APPNAME** is the D-Bus name of the application. A nice format is:
  ```
  # Format
  [website_suffix (com/org)].[organization_name].[application_name_camelcase][.[other]]
  
  # example
  org.libretro.MrBoom.Standalone
  ```
* **SDK** is the name of the SDK that will be used to build the application
* **RUNTIME** is the name of the runtime that will be required by the application
* **BRANCH** is typically the version of the SDK and runtime that will be used

add repository that contains the [runtime](http://flatpak.org/runtimes.html):
```
flatpak remote-add --from gnome https://sdk.gnome.org/gnome.flatpakrepo
```

##  Install/update runtime needed:
```
flatpak install gnome org.gnome.Platform//3.24 org.gnome.Sdk//3.24
```

##  Initalize the build flatpak build directory
```
flatpak build-init mrboom org.libretro.MrBoom.Stanadalone org.gnome.Sdk org.gnome.Platform
```

This should create a directory:
```
[mikeyd@archboxmtd build-mrboom-tmp]$ ls -la mrboom
total 20
drwxr-xr-x 4 mikeyd users 4096 Jul 29 10:33 .
drwxr-xr-x 4 mikeyd users 4096 Jul 29 10:33 ..
drwxr-xr-x 2 mikeyd users 4096 Jul 29 10:33 files
-rw-r--r-- 1 mikeyd users  119 Jul 29 10:33 metadata
drwxr-xr-x 3 mikeyd users 4096 Jul 29 10:33 var
```

## Add any needed source files
`flatpak build` is used to build an application using an SDK. This is where you can copy in your source code.

```
flatpak build dictionary touch /app/some_file.txt

[mikeyd@archboxmtd build-mrboom-tmp]$ tree mrboom
mrboom
├── files
│   └── some_file.txt
├── metadata
└── var
    ├── run -> /run
    └── tmp
```

We are going to now add our source files
```
git clone <URL> <DIR>
cd <DIR>
```
## Run your build commands
Run build commands in the same fashioon you would in debian/rules or via your build scripts.
```
flatpak build ../mrboom <COMMAND>
```

If you need to depend on external libraries/packages, see [flatpak-builder.md](https://github.com/mdeguzis/documents/blob/master/linux-applications/flatpak/flatpak-builder.md), which will show you how to handle this. 

## Completing the build
Once an application has been built, the build-finish command needs to be used to specify access to different parts of the host, such as networking and graphics sockets. This command is also used to specify the command that is used to run the app (done by modifying the metadata file), and to create the application’s exports directory. For example:

```
flatpak build-finish mrboom --socket=x11 --share=network --command=mrboom
```

This command below exports the app, creates a repository called tutorial-repo, installs the Dictionary application in the per-user installation area and runs it.
```
flatpak build-export repo mrboom
```

## Test
```
flatpak --user remote-add --no-gpg-verify --if-not-exists tutorial-repo repo
flatpak --user install tutorial-repo org.libretro.MrBoom.Stanadalone
flatpak run oorg.libretro.MrBoom.Stanadalone
```

# Notable flatpak repos and apps

* [flatpak-gog](https://github.com/kujeger/flatpak-gog)

# Documents

* [Flatpak docs](http://flatpak.org/flatpak/flatpak-docs.html)
* [Building a simple flatpak](http://docs.flatpak.org/en/latest/building-simple-apps.html)
* [Flatpak-builder](http://docs.flatpak.org/en/latest/flatpak-builder.html)
* [flatpak runtimes](http://flatpak.org/runtimes.html)
* [Flathub on GitHub](https://github.com/flathub)
* [Flathub buildbot](https://flathub.org/builds/)
