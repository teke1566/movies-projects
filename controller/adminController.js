const express = require('express');
const router = express.Router();
const path = require('path')

const pool = require('../db');

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }

});

//console.log(storage)
const upload = multer({ storage: storage });



router.post('/api/login', upload.single('profilepic'), (req, res, next) => {


    var file = req.file;

    var getNextUserId = 0;

    var date = new Date();
    // var dateStr =​date.getMonth()+date.getDate()+date.getFullYear()+ date.getHours()+date.getMinutes()+date.getSeconds();
    console.log("file====================== : ", file);
    console.log("file : ", req.file.filename);
    console.log("moviename : ", req.body.moviename);
   
    

    pool.query("select max(movie_id) as id from tbl_movies", (error, results) => {
        if (error) throw error;
        // console.log(results)

        getNextUserId = results.rows[0].id + 1;
        console.log("getNextUserId : " + getNextUserId)

        var id = getNextUserId;
        var name = req.body.moviename;
        var imgname= req.file.profilepic;

        console.log(name)
        

        if (results.rowCount < 0) {

            pool.query("INSERT INTO tbl_movies (movie_id,movie_name,pro_img) VALUES ($1,$2,$3)", [id, name, imgname], (error, results) => {
                if (error) throw error;
                console.log(results.rowCount)
                res.status(200).json(results.rowCount);
            })
        }


    })


})


router.get('/api/user', (req, res, next) => {
    pool.query("select username, password from tbl_users", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })

})

router.get('/add', (req, res, next) => {

    res.sendFile(path.join(__dirname, '../views', 'addmovie.html'))
})



module.exports = router;