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

router.get("/api/movies-list", (req, res, next) => {
	
	pool.query("select movie_id, movie_name,movie_desc, movie_cover,movie_link,movie_release_date,movie_view, cate_id,price_id from tbl_movies ORDER BY movie_id", (error, results) => {
		//if (error) throw error;
		res.send(results.rows);
	});
});

router.get("/", (req, res, next) => {
	res.sendFile(path.join(__dirname, "../views", "index.html"));
});

router.get('/api/categories', (req, res)=>{
    pool.query("select * from tbl_categories", (error, results)=>{
        if(error) throw error;
        res.send(results.rows);
    })
})

/*  
	method returns json data used in update movie admin page 
	while the one in movie detail returns an html page which 
	breaks edit functionality in admin
*/
router.get('/api/movies/:id', async (req, res)=>{
	const id = parseInt(req.params.id);
	const query = 'SELECT * FROM tbl_movies WHERE movie_id = $1';
  	const values = [id];
	try {
		const result =  await pool.query(query, values);
		res.json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error retrieving movie from database');
	}
})

router.get('/api/moviebycate/:type', (req, res)=>{
	const typeMovie = req.params.type;
    pool.query("select * from tbl_movies as a join tbl_categories as b on a.cate_id = b.cate_id where b.cate_name = ($1) order by a.movie_id desc limit 5",[typeMovie], (error, results)=>{
        if(error) throw error;
        res.send(results.rows);
    })
})


module.exports = router;
