const Pool = require('pg').Pool;

const pool = new Pool({
    user:"postgres",
    localhost:"",
    database:"movie-ticket",
    password: "Admin",
    port: 5432,
});

module.exports =  pool;