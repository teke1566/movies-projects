const express = require('express');
const router = express.Router();
const path = require('path')

const pool = require('../db');



router.get('/api/movie/:id',(req,res,next)=>{

    const movie_id = req.params.id;
  //  const movie_id =2;
    console.log(movie_id)

    pool.query("select * from tbl_movies as a join tbl_categories as b on a.cate_id = b.cate_id WHERE a.movie_id = ($1) ",[movie_id], (error, results) => {
        if (error) throw error;
       // res.status(200).json(results.rows);
        res.send(results);
    })
    
})


router.post('/cookie/cart', (req, res, next) => {
    var obj = [];
    obj.push(req.body)

    res.cookie('cookieTicket', obj)

    console.log(obj)

    res.send(obj)

})


router.get('/movie/:id', (req, res, next) => {
    res.sendFile(path.join(__dirname, "../views",'movie_detail.html'))
})




router.get('/movie/ticket/', (req, res, next) => {


    res.sendFile(path.join(__dirname, "../views",'movie_ticket.html'))
})



module.exports = router;