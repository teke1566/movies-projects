const Pool = require("pg").Pool;

const pool = new Pool({
	 user:"postgres",
    localhost:"",
    database:"movie_ticket",
    password: "admin",
    port: 5432,
});


pool.connect(function(err){
    if(err) throw err;
    console.log("DB connected")
})

module.exports = pool;
