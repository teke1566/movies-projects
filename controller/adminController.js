const express = require('express');
const router = express.Router();
const path = require('path')

const pool = require('../db');

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/Images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }

});
const upload = multer({ storage: storage });


router.post('/admin', upload.single('profilepic'), (req, res, next) => {

    let movie_name = req.body.name;
    let movie_description = req.body.description;
    let file = req.file;
    let movie_link = req.body.link;
    let movie_releaseDate = req.body.releaseDate;
    let movie_views = req.body.views;
    let movie_category = parseInt(req.body.category);
    let movie_price = req.body.price;

    let getNextUserId = 0;

    let date = new Date();
      
    pool.query("select max(movie_id) as id from tbl_movies", (error, results) => {
        if (error) throw error;
        console.log(results.rows)

        getNextUserId = results.rows[0].id + 1;
        console.log("getNextUserId : " + getNextUserId)
        /*
            movie_id INT  ,
            movie_name VARCHAR ( 50 ),
            movie_desc VARCHAR ( 50 ),
            movie_cover VARCHAR ( 50 ),
            movie_link VARCHAR ( 50 ),
            movie_release_date VARCHAR ( 50 ),
            movie_view INT,
            cate_id INT,
            price_id INT
        */

        if (results.rowCount > 0) {

            pool.query("INSERT INTO tbl_movies (movie_id,movie_name,movie_desc,movie_cover, movie_link, movie_release_date, movie_view, cate_id, price_id) VALUES ($1,$2,$3, $4, $5, $6, $7, $8, $9)", [getNextUserId, movie_name, movie_description, file, movie_link, movie_releaseDate,movie_views, movie_category, movie_price  ], (error, results) => {
                //if (error) throw error;
                console.log(results.rowCount)
                res.status(200).json(results.rowCount);
            })
        }
    })

    res.send("An error occured");

})


router.get('/admin', (req, res, next) => {
    // pool.query("select username, password from users", (error, results) => {
    //     if (error) throw error;
    //     res.status(200).json(results.rows);
    // })
    res.sendFile(path.join(__dirname, '../views', 'admin.html'));
})

router.get("/api/movies-list", (req, res, next) => {
	
    pool.query("select movie_id, movie_name,movie_desc, movie_cover,movie_link,movie_release_date,movie_view, cate_id,price_id from tbl_movies", (error, results) => {
    //if (error) throw error;
    res.send(results.rows);
});
});
module.exports = router;