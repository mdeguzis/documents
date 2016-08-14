<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About](#about)
- [qtbase-opensource-src](#qtbase-opensource-src)
- [qtx11extras-opensource-src](#qtx11extras-opensource-src)
- [qttools-opensource-src](#qttools-opensource-src)
- [qtxmlpatterns-opensource-src](#qtxmlpatterns-opensource-src)
- [qtdeclaritive-opensource-src](#qtdeclaritive-opensource-src)
- [qtwebchannel](#qtwebchannel)
- [qtwebengine](#qtwebengine)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About

Below is an easy to parse list to help find out what should be built in what order to provide what Qt5 pacakage. The requires list for each package build only lists qt packages. For the complete list, reference the debian/control files in the [pacakging repository](https://github.com/ProfessorKaos64/LibreGeek-Packaging/)

\* The below main items are listed in build order. All require at a version of >= 5.6.0 and `pkg-kde-tools`.

# qtbase-opensource-src
 - **requires**
  - libqt5sql5-sqlite (build independs)
  - qttools5-dev-tools (build independs)
 - **provides**
  - libqt5concurrent5
  - libqt5core5a
  - libqt5dbus5
  - libqt5gui5
  - libqt5libqgtk2
  - libqt5network5
  - libqt5opengl5
  - libqt5sql5
  - libqt5sql5-mysql
  - libqt5sql5-odbc
  - libqt5sql5-psql
  - libqt5sql5-sqlite
  - libqt5sql5-tds
  - libqt5sql5-ibase
  - libqt5xml5
  - libqt5dbus5
  - libqt5test5
  - libqt5concurrent5
  - libqt5widgets5
  - libqt5printsupport5
  - qtbase5-dev
  - qtbase5-private-dev
  - libqt5opengl5-dev
  - qtbase5-dev-tools
  - qt5-qmake
  - qtbase5-examples
  - qtbase5-dbg
  - qtbase5-dev-tools-dbg
  - qtbase5-examples-dbg
  - qt5-default
  - qtbase5-doc
  - qtbase5-doc-html

# qtx11extras-opensource-src
 - **requires**
  - qtbase5-dev (>= 5.6.1+dfsg~),
  - qtbase5-private-dev
 - **provides**
  - libqt5x11extras5
  - libqt5x11extras5-dev
  - qtx11extras5-dbg
  - qtx11extras5-doc
  - qtx11extras5-doc-html

# qttools-opensource-src
 - **requires**
  - debhelper
  - libqt5opengl5-dev
  - libqt5sql5-sqlite
  - libqt5webkit5-dev
  - pkg-kde-tools
  - qtbase5-private-dev
  - qtdeclarative5-private-dev
  - zlib1g-dev
 - **provides**
  - libqt5clucene5
  - libqt5designer5
  - libqt5designercomponents5
  - libqt5help5
  - qdbus-qt5
  - qttools5-dbg
  - qttools5-dev
  - qttools5-dev-tools
  - qttools5-doc
  - qttools5-doc-html
  - qttools5-examples
  - qttools5-examples-dbg
  - qttools5-private-dev
  - 
# qtxmlpatterns-opensource-src
 - **requires**
  - qtbase5-private-dev
 - **provides**
  - libqt5xmlpatterns5
  - libqt5xmlpatterns5-dev
  - qtxmlpatterns5-dev-tools
  - qtxmlpatterns5-examples
  - qtxmlpatterns5-doc
  - qtxmlpatterns5-doc-html

# qtdeclaritive-opensource-src
 - **requires**
  - libqt5xmlpatterns5-dev
 - **provides**
  - libqt5qml5
  - libqt5quick5
  - libqt5quickparticles5
  - libqt5quicktest5
  - libqt5quickwidgets5
  - qt5-qmltooling-plugins
  - qml-module-qt-labs-folderlistmodel
  - qml-module-qtquick-localstorage
  - qml-module-qtqml-models2
  - qml-module-qtqml-statemachine
  - qml-module-qtquick-particles2
  - qml-module-qtquick2
  - qml-module-qt-labs-settings
  - qml-module-qttest
  - qml-module-qtquick-window2
  - qml-module-qtquick-xmllistmodel
  - qtdeclarative5-dev
  - qtdeclarative5-private-dev
  - qmlscene
  - qml
  - qtdeclarative5-examples
  - qtdeclarative5-dbg
  - qtdeclarative5-doc
  - qtdeclarative5-doc-html

# qtwebchannel
 - **requires**
  - libqt5concurrent5 
  - libqt5dbus5 
  - libqt5libqgtk2
  - libqt5opengl5-dev
  - libqt5opengl5
  - libqt5printsupport5
  - libqt5test5
  - libqt5widgets5
  - libqt5xml5
  - qtdeclarative5-dev
  - qtdeclarative5-dev-tools
  - qt5-default
  - qt5-qmake
  - qtbase5-private-dev
 - **provides*
  - libqt5-qtwebchannel-dev
  - libqt5-qtwebchannel-examples
  - libqt5-qtwebchannel-imports
  - libqt5-qtwebchannel-private-dev

# qtwebengine
 - **requires**
  - libqt5concurrent5
  - libqt5dbus5
  - libqt5libqgtk2
  - libqt5opengl5-dev
  - libqt5opengl5
  - libqt5printsupport
  - libqt5qml5
  - libqt5quick5
  - libqt5quickparticles5
  - libqt5quicktest5
  - libqt5quickwidgets5
  - libqt5sql5
  - libqt5widgets5
  - libqt5-qtwebchannel-dev
  - libqt5-qtwebchannel-imports
  - libqt5xml5
  - libqt5xmlpatterns5-dev
  - qtdeclarative5-dev
  - qtdeclarative5-dev-tools
  - qtdeclarative5-private-dev
  - qt5-qmltooling-plugin
  - qt5-default
  - qt5-qmake
  - qtbase5-dev-tools
  - qtbase5-private-de
 - **provides*
  - libqt5-qtwebengine
  - libqt5-qtwebengine-dev
  - libqt5-qtwebengine-private-dev
  - libqt5-qtwebengine-examples
  
