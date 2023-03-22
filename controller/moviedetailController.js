const express = require('express');
const router = express.Router();
const path = require('path')

const pool = require('../db');



router.get('/api/movie/:id', (req, res, next) => {

    const movie_id = req.params.id;
    //  const movie_id =2;
    console.log(movie_id)

    pool.query("select * from tbl_movies as a join tbl_categories as b on a.cate_id = b.cate_id WHERE a.movie_id = ($1) ", [movie_id], (error, results) => {
        if (error) throw error;
        // res.status(200).json(results.rows);
        res.send(results);
    })

})


router.post('/cookie/cart', (req, res, next) => {
    var obj = {};
    // var arrObj = [];

    console.log(req.body)
    obj = {
        movie_id: req.body.movie_id,
        movie_name: req.body.movie_name,
        theater: req.body.theater,
        seatno: req.body.seatno,
        getDate: req.body.getDate,
        getTime: req.body.getTime,
        price: req.body.price,
        discount: req.body.discount,
        total_price: req.body.total_price

    }

    // arrObj.push(obj)
    res.cookie('cookieTicket', JSON.stringify(obj));
    console.log(obj)
    res.send(obj)
})


router.get('/movie/:id', (req, res, next) => {
    res.sendFile(path.join(__dirname, "../views", 'movie_detail.html'))
})


router.get('/filter', (req, res, next) => {
    res.sendFile(path.join(__dirname, "../views", 'search.html'))
})


router.get('/api/filter/:key', (req, res, next) => {

    const keySearch = req.params.key;
    
    console.log(keySearch);

    if (keySearch == "all") {
        console.log("jd")
        pool.query("select * from tbl_movies", (error, results) => {
            if (error) throw error;
            console.log(results.rows)
            res.send(results.rows);
        })
    } else {
        pool.query("select * from tbl_movies where movie_name like '%' || $1 || '%'", [keySearch], (error, results) => {
            if (error) throw error;
            // res.status(200).json(results.rows);
            console.log(results.rows)
            res.send(results.rows);
        })
    }



})






module.exports = router;