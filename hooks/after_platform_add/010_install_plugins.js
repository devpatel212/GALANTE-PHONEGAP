#!/usr/bin/env node

//this hook installs all your plugins

// add your plugins to this list--either the identifier, the filesystem location or the URL
var pluginlist = [
	"com.pushwoosh.plugins.pushwoosh@3.5.4",
	"cordova-plugin-device@1.0.1",
	"cordova-plugin-device-motion@1.1.0",
	"cordova-plugin-device-orientation@1.0.0",
	"cordova-plugin-dialogs@1.1.0",
	"cordova-plugin-file@2.0.0",
	"cordova-plugin-file-transfer@1.0.0",
	"cordova-plugin-statusbar@1.0.1",
	"cordova-plugin-geolocation@1.0.0",
	"cordova-plugin-inappbrowser@1.0.1",
	"cordova-plugin-splashscreen@2.0.0",
	"cordova-plugin-vibration@1.1.0",
	"cordova-plugin-whitelist@1.0.0",
	"cordova-plugin-x-toast@2.2.0",
	"nl.x-services.plugins.socialsharing@4.3.18",
	"cordova-plugin-transport-security@0.1.0",
	"cordova-plugin-admobpro@2.9.7"
];


// no need to configure below

var fs = require('fs');
var path = require('path');
var sys = require('sys')
var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    sys.puts(stdout)
}

pluginlist.forEach(function(plug) {
    exec("cordova plugin add " + plug, puts);
});
