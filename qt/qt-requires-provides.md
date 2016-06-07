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
  - qtbase5-private-dev
 - **provides*
