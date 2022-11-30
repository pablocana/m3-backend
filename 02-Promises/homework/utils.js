'use strict';

var fs = require('fs');
var Promise = require('bluebird');
var chalk = require('chalk');

var utils = {};

utils.readFile = function (filename, callback) {
	var randExtraTime = Math.random() * 200;			// aca le dice que genere un nro aleatorio entre 0 y 200.
	setTimeout(function () {
		fs.readFile(filename, function (err, buffer) {
			if (err) callback(err);
			else callback(null, buffer.toString());
		});
	}, randExtraTime);
	// con el randExtraTime le agrega un minimo tiempo (entre 0 y 200 milisegundos) para que se ejecute posteriormente a otra fx. (aca lo usa para simular el orden indiferente en el problemB ex one).
};

utils.promisifiedReadFile = function (filename) {
	return new Promise(function (resolve, reject) {
		utils.readFile(filename, function (err, str) {
			if (err) reject(err);
			else resolve(str);
		});
	});
};

utils.blue = function (text) {
	console.log(chalk.blue(text));
};

utils.magenta = function (text) {
	console.error(chalk.magenta(text));
};

module.exports = utils;
