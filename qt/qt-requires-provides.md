# About

Below is an easy to parse list to help find out what should be built in what order to provide what pacakage. The requires list for each package build only lists qt packages. For the complete list, reference the debian/control files in the [pacakging repository](https://github.com/ProfessorKaos64/LibreGeek-Packaging/)

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
