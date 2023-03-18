const express = require('express');
const router = express.Router();
const path = require('path')

const pool = require('../projects/db');

// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"Images");
//     },
//     filename:(req,file,cb)=>{
//         console.log(file);
//         cb(null,Date.now()+path.extname(file.originalname));
//     },
// });

// const upload = multer({storage:storage});




router.post('/api/login', (req, res, next) => {
    var getNextUserId = 0;

    var date = new Date();
   // var dateStr =​date.getMonth()+date.getDate()+date.getFullYear()+ date.getHours()+date.getMinutes()+date.getSeconds();
    console.log(date);


    pool.query("select max(pro_id) as id from products", (error, results) => {
        if (error) throw error;
       // console.log(results)
       
        getNextUserId = results.rows[0].id+1;
        console.log("getNextUserId : " + getNextUserId)

        var id = getNextUserId;
        var name = req.body.username;
        var img = req.body.profilepic.replace(/^.*[\\\/]/, '');
       // var nameImg = ;

        if(results.rowCount > 0){

            pool.query("INSERT INTO products (pro_id,pro_name,pro_img) VALUES ($1,$2,$3)", [id, name, img], (error, results) => {
                if (error) throw error;
                console.log(results.rowCount)
                res.status(200).json(results.rowCount);
            })
        }
        

    })
    
   
})


router.get('/api/user', (req, res, next) => {
    pool.query("select username, password from users", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })

})

router.get('/', (req, res, next) => {

    res.sendFile(path.join(__dirname, '/views', 'index.html'))
})



module.exports = router;