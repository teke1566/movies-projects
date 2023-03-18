const Pool = require('pg').Pool;

const pool = new Pool({
    user:"postgres",
    localhost:"",
    database:"cars",
    password: "admin",
    port: 5432,
});

module.exports =  pool;