const express = require('express');
const router = express.Router();
const path = require('path')

const pool = require('../db');



router.get('/api/movie/detail',(req,res,next)=>{
    pool.query("select * from tbl_movies", (error, results) => {
        if (error) throw error;
       // res.status(200).json(results.rows);
        res.send(results);
    })
    
})


router.get('/movie/detail', (req, res, next) => {
    

    res.sendFile(path.join(__dirname, "../views",'movie_detail.html'))

})



module.exports = router;