const express = require('express');
const router = express.Router();
const path = require('path')

const pool = require('../db');


router.get('/api/ticket/history',(req,res,next)=>{

    pool.query("select * from tbl_tickets ", (error, results) => {
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

module.exports = router;