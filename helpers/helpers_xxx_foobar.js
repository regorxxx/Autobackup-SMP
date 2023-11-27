﻿'use strict';
//08/11/23

include('helpers_xxx_file.js');
include('helpers_xxx_console.js');

/* 
	Panels
*/

function compareVersions(from, to, bNum = true) {
	if (typeof from === 'string') {from = from.split('.');}
	if (typeof to === 'string') {to = to.split('.');}
	if (bNum) {
		if (to.length > 3) {to.length = 3;}
		if (from.length > 3) {from.length = 3;}
	}
	for (let i = 0; i < to.length; ++i) {
		if (to[i] !== from[i]) {
			return to[i].localeCompare(from[i], void(0), {numeric: true}) < 0;
		}
	}
	return true;
}

function isCompatible(requiredVersionStr = '1.6.1', target = 'smp') {
	// return compareVersions((target.toLowerCase === 'smp' ? utils : fb).Version.split('.'), requiredVersionStr.split('.'));
	return true;
}

function checkCompatible(requiredVersionStr = '1.6.1', target = 'smp') {
	if (!isCompatible(requiredVersionStr)) {
		console.popup('This script requires v' + requiredVersionStr + '. Current ' + (target.toLowerCase === 'smp' ? 'component' : 'Foobar2000') + ' version is v' + (target.toLowerCase === 'smp' ? utils : fb).Version + '.', window.Name);
	}
}

function memoryUsed(bConsole = false) { // In Mbs
	let memUsage = -1;
	console.log(window.JsMemoryStats);
	memUsage = round(window.JsMemoryStats.MemoryUsage / 1000000, 2);
	if (bConsole) {console.log(window.Name + ' mem usage: ' + memUsage + ' Mb');}
	return memUsage;
}

function isPortable(propertyText, bWarn = true) {
	let bPort = _isFile(fb.FoobarPath + 'portable_mode_enabled');
	if (bPort && bWarn) {
		if (isArray(propertyText)) {propertyText = propertyText.join('\n');}
		fb.ShowPopupMessage('This is a portable installation. It\'s recommended to use relative paths on the properties panel for these variables:\n' + propertyText, window.Name);
	}
	return bPort;
}

function lastStartup() {
	return lastModified(fb.ProfilePath + 'running');
}