const Pool = require("pg").Pool;

const pool = new Pool({
	user: "",
	localhost: "",
	database: "movie-ticket",
	password: "",
	port: 5432,
});

module.exports = pool;
