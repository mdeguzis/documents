# About

Useful info for working with symbols files.

# Links

* [Using symbols files (Debian)](https://wiki.debian.org/UsingSymbolsFiles)
* [Symbols files (KDE)](http://pkg-kde.alioth.debian.org/symbolfiles.html)

# Example

```
$ cat libfoo.symbols 
libqtubuntu_sensors.so.1 qtubuntu-sensors #MINVER#
 _ZN17OrientationSensor11qt_metacallEN11QMetaObject4CallEiPPv@Base 0.5.1daily13.04.16ubuntu.unity.next
 _ZN17OrientationSensor11qt_metacastEPKc@Base 0.5.1daily13.04.16ubuntu.unity.next
 _ZN17OrientationSensor16staticMetaObjectE@Base 0.5.1daily13.04.16ubuntu.unity.next
 _ZN17OrientationSensor4typeE@Base 0.5.1daily13.04.16ubuntu.unity.next
 _ZN17OrientationSensorD0Ev@Base 0.5.1daily13.04.16ubuntu.unity.next
 _ZN17OrientationSensorD1Ev@Base 0.5.1daily13.04.16ubuntu.unity.next
 _ZN17OrientationSensorD2Ev@Base 0.5.1daily13.04.16ubuntu.unity.next

$ sed 's/ \(_.*\) \(.*\)/ (c++)"\1" \2/' libfoo.symbols | c++filt
libqtubuntu_sensors.so.1 qtubuntu-sensors #MINVER#
 (c++)"OrientationSensor::qt_metacall(QMetaObject::Call, int, void**)@Base" 0.5.1daily13.04.16ubuntu.unity.next
 (c++)"OrientationSensor::qt_metacast(char const*)@Base" 0.5.1daily13.04.16ubuntu.unity.next
 (c++)"OrientationSensor::staticMetaObject@Base" 0.5.1daily13.04.16ubuntu.unity.next
 (c++)"OrientationSensor::type@Base" 0.5.1daily13.04.16ubuntu.unity.next
 (c++)"OrientationSensor::~OrientationSensor()@Base" 0.5.1daily13.04.16ubuntu.unity.next
 (c++)"OrientationSensor::~OrientationSensor()@Base" 0.5.1daily13.04.16ubuntu.unity.next
 (c++)"OrientationSensor::~OrientationSensor()@Base" 0.5.1daily13.04.16ubuntu.unity.next
 ```
