﻿'use strict';
//17/12/23

/* exported _zip, _unzip */

include('helpers_xxx.js');
/* global folders:readable, soFeat:readable */
include('helpers_xxx_prototypes.js');
/* global _q:readable, isArrayStrings:readable */
include('helpers_xxx_file.js');
/* global _runCmd:readable */

// _zip(folders.xxx + 'test.txt','test.zip');
// _zip(['test.txt', 'test2.txt'], 'test.zip');
function _zip(file, toPath, bAsync = false, relativePath = null, timeout = 0) {
	const cmd = _q(folders.xxx + 'helpers-external\\7z\\' + (soFeat.x64 ? '7za' : '7za_32')+ '.exe') + ' a -tzip ' + _q(toPath) + ' ' + (isArrayStrings(file) ? file.map((f) => {return _q(f);}).join(' ') : _q(file));
	let relCmd;
	if (timeout) {
		if (relativePath) {
			relCmd = 'CMD /Q /C' + _q('CD ' + _q(relativePath) + ' && TIMEOUT /T ' + timeout+ ' /NOBREAK >nul && ' +  cmd);
		} else {
			relCmd = 'CMD /Q /C ' + _q('TIMEOUT /T ' + timeout+ ' /NOBREAK >nul && ' +  cmd);
		}
	} else if (relativePath) {
		relCmd = 'CMD /Q /C ' + _q('CD ' + _q(relativePath) + ' && ' +  cmd);
	}
	_runCmd(relCmd || cmd, !(bAsync || timeout));
}

// _unzip(folders.xxx + 'test.zip', folders.xxx + 'test\\');
function _unzip(file, toPath, bAsync = false) {
	const cmd = '"' + folders.xxx + 'helpers-external\\7z\\' + (soFeat.x64 ? '7za' : '7za_32')+ '.exe" e "' + file + '" -o"' + toPath + '"';
	_runCmd(cmd, !bAsync);
}