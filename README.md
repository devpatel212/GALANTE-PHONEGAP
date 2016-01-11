# WAPP - Cordova Wordpress App
# README file

Thank you for purchasing this item. Please, read these instructions to build and run the app.


## Set up your environment

To build this app you need to install Cordova in your system. You can get it by visiting its
website: http://cordova.apache.org/

(If you have already installed Cordova, skip this step.)

In order to deploy the app to any specific platform (iOS, Android), you will need the specific
SDKs installed in your computer. 


## Build the app

Once you have installed and set up Cordova in your computer, open a terminal and go to the Wapp project
folder. Then, invoke the following commands for adding those platforms you want to deploy the app:

	cordova platform add android
	cordova platform add ios
	

## Customize

Customization of the Wapp app is quite easy. Depending on what you want to do, read the following
indications.

### Your site's URL

This app is designed for bringing to the user a unique experience when reading a WordPress site of your
own. In order to get the things working, you must set the URL of the site you want to point at the main
config file.

Open the config.js file at the www/js folder and change the API_BASE_URL variable to the proper value.

	var API_BASE_URL = "http://your.wordpress.site/";

Then, save the file and build the app again.

Make sure you have the Wapp plugin installed at your WordPress site.

### Push messages

The Wapp app can receive Push notifications through a third party service provider called PushWoosh. To enable
this feature you must, first at all, create an account at PushWoosh and register the app at Google Cloud Messaging
and/or Apple Push Notifications service.

When you have done, take the PushWoosh application id and set the variable PUSHWOOSH_ID at the config.js file.

	var PUSHWOOSH_ID = "XXXXX-YYYYY";

Save the file and build the app again. In the next run, the app will ask you if you want to receive push notifications.


### Splash screen

You must provide some PNG images for the splash screen. The amount of files and their sizes depend on the target platform.

Every time you made changes in those images, you should run the 'cordova prepare' command to update the files at each
platform build. Then rebuild app with the 'cordova build' command.

#### Android

The following files are required:

* screen-ldpi.png, for low dpi screens (~120dpi)
* screen-mdpi.png, for medium dpi screens (~160dpi)
* screen-hdpi.png, for high dpi screens (~240dpi)
* screen-xhdpi.png, for extra high dpi screens (~320dpi)
* screen-xxhdpi.png, for extra extra high dpi screens (~480dpi)

Put them on the res/screen/android folder into the Wapp project folder.

#### iOS

The following files are required:

* screen~iphone.png, for the iPhone (320x480)
* screen@2x~iphone.png, for the iPhone retina display (640x960)
* screen-568h.png, for the iPhone 5 (320x568)
* screen-568h@2x.png, for the iPhone 5 retina display (640x1136)
* screen-667h.png, for the iPhone 6 retina display (750x1334)
* screen-736h.png, for the iPhone 6 3x display (1242x2208) 

Put them on the res/screen/ios folder into the Wapp project folder.


### App icon

#### iOS

This document explains how to customize the app icon for an iOS build of the Wapp app. It can be easily done by following these steps:

First, open the project folder and go to the res folder. You can see some subfolders and, among them, one called ios.

Prepare several versions of the app icon image in PNG format. The required image sizes and filenames are detailed below:

* icon-40.png (40×40)
* icon-40@2x.png (80×80)
* icon-50.png (50×50)
* icon-50@2x.png (100×100)
* icon-60.png (60×60)
* icon-60@2x.png (120×120)
* icon-60@3x.png (180×180)
* icon-72.png (72×72)
* icon-72@2x.png (144×144)
* icon-76.png (76×76)
* icon-76@2x.png (152×152)
* icon-small.png (29×29)
* icon-small@2x.png (58×58)
* icon.png (57×57)
* icon@2x.png (114×114)

Copy those PNG files into the ios folder.

Finally, rebuild the project and you will see the new app icon when deploy.

#### Android

This document explains how to customize the app icon for an android build of the Wapp app. It can be easily done by following these steps:

First, open the project folder and go to the res folder. You can see some subfolders and, among them, one called android. Inside that folder you can see some folders, called mipmap-*.

Prepare several versions of the app icon image in PNG format. Their sizes depend on the target screen pixel density. The required image sizes are the following:

 * 48×48 for ldpi
 * 48×48 for mdpi
 * 72×72 for hdpi
 * 96×96 for xhdpi
 * 144×144 for xxhdpi
 
Then, copy each PNG file into the corresponding mipmap-* folder. The file name must be ic_launcher.png.

Finally, rebuild the project and you will see the new app icon when deploy.

## Source code information

Phonegap versión: 5.3.1

com.pushwoosh.plugins.pushwoosh 3.5.4 “Pushwoosh”
cordova-plugin-admobpro 2.9.7 “AdMob Plugin Pro”
cordova-plugin-device 1.0.1 “Device”
cordova-plugin-device-motion 1.1.0 “Device Motion”
cordova-plugin-device-orientation 1.0.0 “Device Orientation”
cordova-plugin-dialogs 1.1.0 “Notification”
cordova-plugin-extension 1.1.6 “Cordova Plugin Extension”
cordova-plugin-file 2.0.0 “File”
cordova-plugin-file-transfer 1.0.0 “File Transfer”
cordova-plugin-geolocation 1.0.0 “Geolocation”
cordova-plugin-inappbrowser 1.0.1 “InAppBrowser”
cordova-plugin-splashscreen 2.0.0 “Splashscreen”
cordova-plugin-statusbar 1.0.1 “StatusBar”
cordova-plugin-transport-security 0.1.0 “App Transport Security”
cordova-plugin-vibration 1.1.0 “Vibration”
cordova-plugin-whitelist 1.0.0 “Whitelist”
cordova-plugin-x-toast 2.2.0 “Toast”
nl.x-services.plugins.socialsharing 4.3.18 “SocialSharing”

To check the version you have installed on your computer run the following commands from the console: 
cordova plugin list
cordova --version

(You must run the command within the project folder)


## Further info

Please, visit http://themebreakers.com/support/article-categories/wapp-multiplatform-app/ for additional info about the WAPP app
and the WP plugin. You can find there a lot of useful articles.