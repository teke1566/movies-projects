const express = require('express');
const router = express.Router();
const path = require('path')

const pool = require('../db');


router.get('/api/ticket/history/:id',(req,res,next)=>{

    const userId = req.params.id;
   // const userId = '1';

    console.log("userId ::::::::" + userId)

    pool.query("select a.tickets_id, a.discount, a.remark, a.seatno, a.showtimes, a.totalprice, b.movie_name, b.theater, b.price_id from tbl_tickets as a  join tbl_movies as b on a.movie_id = b.movie_id join tbl_categories as c on c.cate_id = b.cate_id join tbl_users as d on d.user_id = a.user_id where a.user_id = ($1) order by a.tickets_id DESC",[userId], (error, results) => {
        if (error) throw error;
       // res.status(200).json(results.rows);
        res.send(results.rows);
    })
    
})


router.post('/api/ticket/add', async (req, res, next) => {


    console.log("ddd")
    pool.query("select max(tickets_id) as id from tbl_tickets", (error, results) => {
        if (error) throw error;
        // console.log(results)

       let getNextTicketId = parseInt(results.rows[0].id) + 1;
        if(isNaN(getNextTicketId)){
            getNextTicketId = 1;
        }

        var id = getNextTicketId;
        var showtime = req.body.showtime;
        var discount = req.body.discount;
        var user_id = req.body.user_id;
        var movie_id = req.body.movie_id;
       
        var seatno = req.body.seatno;
        var remark = req.body.remark;
        var price = req.body.price;
        var totalprice = req.body.totalprice;
        
        
        if (results.rowCount > 0) {


            pool.query("select movie_view from tbl_movies where movie_id = ($1) ", [movie_id], (error, res_view) => {
                if (error) throw error;
                // res.status(200).json(results.rows);
                console.log(res_view.rows[0].movie_view)
                let updatView = parseInt(res_view.rows[0].movie_view)+1;

                pool.query("UPDATE  tbl_movies SET movie_view= ($1) where movie_id = ($2)", [updatView,movie_id ], (error, results) => {
                    if (error) throw error;
                    
                })

            })



            pool.query("INSERT INTO tbl_tickets (tickets_id,seatno,showtimes,discount,price_id,totalprice,user_id,movie_id,remark) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)", [id, seatno, showtime, discount, price, totalprice,user_id,movie_id,remark], (error, results) => {
                if (error) throw error;
                console.log(results.rowCount)
                if (results.rowCount > 0) {
                    res.cookie('cookieTicket', '');
                    res.send("success")

                }
            })
        }



    })
})



router.get('/api/category/:cate', (req, res, next) => {

    const keySearch = req.params.cate;
    
    console.log(keySearch);//

    pool.query("select * from tbl_movies as a join tbl_categories as b on a.cate_id = b.cate_id where b.cate_name = ($1)", [keySearch], (error, results) => {
        if (error) throw error;
        
        console.log(results.rows)
        res.send(results.rows);
    })

})

router.get('/type/:cate', (req, res, next) => {
    res.sendFile(path.join(__dirname, "../views", 'filterbycategory.html'))
})



router.get('/history/ticket/', (req, res, next) => {

    res.sendFile(path.join(__dirname, "../views",'movie_ticket.html'))
})

module.exports = router;