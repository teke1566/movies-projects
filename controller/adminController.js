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


router.post('/movie/add', upload.single('profilepic'), (req, res, next) => {

    let movie_name = req.body.name;
    let movie_description = req.body.description;
    let file = req.file;
    let movie_link = req.body.link;
    let movie_releaseDate = req.body.releaseDate;
    let movie_views = req.body.views;
    let movie_category = parseInt(req.body.category);
    let movie_price = req.body.price;
    let theater = parseInt(req.body.theater);
    let getNextUserId = 0;

    let date = new Date();
      
    pool.query("select max(movie_id) as id from tbl_movies", (error, results) => {
        if (error) throw error;
        //console.log(results.rows)
        console.log(file);
        getNextUserId = results.rows[0].id + 1;
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

            pool.query("INSERT INTO tbl_movies (movie_id,movie_name,movie_desc,movie_cover, movie_link, movie_release_date, movie_view, cate_id, price_id, theater) VALUES ($1,$2,$3, $4, $5, $6, $7, $8, $9, $10)", [getNextUserId, movie_name, movie_description, file.filename, movie_link, movie_releaseDate,movie_views, movie_category, movie_price , theater ], (error, results) => {
                if (error) {
                    res.send(error.message);
                }
                else{

                    res.status(200).json(results.rowCount);
                }
            })
        }
    })
})
router.post('/movie/update', upload.single('profilepic'), (req, res, next) => {

    let movie_name = req.body.name;
    let movie_description = req.body.description;
    let file = req.file;
    let movie_link = req.body.link;
    let movie_releaseDate = req.body.releaseDate;
    let movie_views = req.body.views;
    let movie_category = parseInt(req.body.category);
    let movie_price = req.body.price;
    let theater = parseInt(req.body.theater);

    let movieId = parseInt(req.body.movie_id);
    let getNextUserId = 0;

    let date = new Date();
      
    pool.query("select * from tbl_movies where movie_id="+movieId, (error, results) => {
        if (error) throw error;
        getNextUserId = results.rows[0].id + 1;
        
        if (results.rowCount > 0) {
            //update image if image exists 
            if(file){
                pool.query("UPDATE tbl_movies SET movie_name=$1,movie_desc=$2, movie_link=$3, movie_release_date=$4, movie_view=$5, cate_id=$6,  price_id=$7, theater=$8 where movie_id=$9", 
                [movie_name, movie_description, movie_link, movie_releaseDate,movie_views, movie_category, movie_price , theater, movieId ], (error, results) => {
                    if (error) {
                        res.send(error.message);    
                    }
                    else{
    
                        res.status(200).json("Movie updated successfully");
                    }
                })
            }
            else{
                pool.query("UPDATE tbl_movies SET movie_name=$1, movie_desc=$2, movie_link=$3, movie_release_date=$4, movie_view=$5, cate_id=$6, price_id=$7, theater=$8 WHERE movie_id=$9", [movie_name, movie_description, movie_link, movie_releaseDate, movie_views, movie_category, movie_price, theater, movieId], (error, results) => {
                    if (error) {
                        res.send(error.message);
                    } else {
                        res.status(200).json("Movie updated successfully");
                    }
                });   
            }
        }
        else{

            res.status(404).send("Movie not found");
        }
       
        
    })
})

router.get('/admin', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'admin.html'));
})


module.exports = router;