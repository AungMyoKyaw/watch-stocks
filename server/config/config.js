"use strict";

let envName = process.argv[2] ? process.argv[2] : 'development';

envName = process.env.NODE_ENV || 'development';

let config = {
	development:{
		db:"mongodb://chart-the-stock-market:ijUcOqQDeHRzaj2PWx7HfO0ft8nlhB2glpAJRQqj7FcGFp0RW0Nx8g7Km41MmwvPKlOlZwTmDKNXO9OfVjIErEkmPZh4RAfPnzgR@ds127439.mlab.com:27439/chart-the-stock-market",
		port:4444
	},
	production:{
    db:"mongodb://chart-the-stock-market:ijUcOqQDeHRzaj2PWx7HfO0ft8nlhB2glpAJRQqj7FcGFp0RW0Nx8g7Km41MmwvPKlOlZwTmDKNXO9OfVjIErEkmPZh4RAfPnzgR@ds127439.mlab.com:27439/chart-the-stock-market",
		port:process.env.PORT
	}
}

module.exports = config[envName];
