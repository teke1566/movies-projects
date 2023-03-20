const Pool = require("pg").Pool;

const pool = new Pool({
	user: "kevinchemutai",
	localhost: "",
	database: "movie-ticket",
	password: "cher5650",
	port: 5432,
});

module.exports = pool;
