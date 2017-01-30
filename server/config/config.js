"use strict";

let envName = process.argv[2] ? process.argv[2] : 'development';

envName = process.env.NODE_ENV || 'development';

let config = {
	development:{
		port:4444
	},
	production:{
		port:process.env.PORT
	}
}

module.exports = config[envName];
