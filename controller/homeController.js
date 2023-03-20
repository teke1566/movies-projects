const express = require("express");
const router = express.Router();
const path = require("path");
const pool = require("../db");
const app = express();

//app.set("views", path.join(__dirname, "../views"));
router.get("/api/movies", (req, res, next) => {
	pool.query("select * from tbl_movies as a join tbl_categories as b on a.cate_id = b.cate_id ", (error, results) => {
		if (error) throw error;
		res.send(results.rows);
	});
});

router.get("/movies", (req, res, next) => {
	res.sendFile(path.join(__dirname, "../views", "index.html"));
});

router.get('/api/categories', (req, res)=>{
    pool.query("select * from tbl_categories", (error, results)=>{
        if(error) throw error;
        res.send(results.rows);
    })
})
module.exports = router;
