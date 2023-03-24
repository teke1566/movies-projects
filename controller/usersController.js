const express = require('express');
const router = express.Router();
const path = require('path')

const pool = require('../db');
const bcrypt = require("bcrypt");


router.post('/api/checkEmail', async (req, res, next) => {
    var email = req.body.email;
    if (email != "") {
        pool.query("select * from tbl_users WHERE email = ($1) ", [email], (error, results) => {
            if (error) throw error;
            console.log(results.rows);

            if (results.rowCount > 0) {
                res.send("cannot")
            } else {
                res.send("can")
            }
            // res.send(results);
        })
    } else {
        res.send("cannot")
    }


})


router.post('/api/login', async (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;

    console.log("ld")
    pool.query("select * from tbl_users WHERE email = ($1) ", [email], (error, results) => {
        if (error) throw error;
        console.log(results.rows);

        if (results.rowCount > 0) {
            console.log(results.rows[0].role_id);
            console.log(results.rows[0].password);

            bcrypt.compare(password, results.rows[0].password, (err, match) => {
                if (err) {
                    res.send("err")
                }
                if (!match) {
                    res.send("Invalid")
                } else {
                    res.cookie("userID", results.rows[0].user_id);
                    res.cookie("email", email);
                    res.cookie("role_id", results.rows[0].role_id)
                    res.cookie("firstNm", results.rows[0].firstname);
                    res.cookie("lastNm", results.rows[0].lastname)
                    res.cookie("isAuthenticated", true);
                    if (results.rows[0].role_id == 1) {
                        res.send("Success for admin")
                    } else {
                        res.send("Success for customer")
                    }
                }
            });

        } else {
            res.send("Invalid")
        }



        // res.send(results);
    })
})

router.get('/login', (req, res, next) => {

    res.sendFile(path.join(__dirname, "../views", 'login.html'))
})
router.get('/api/logout', (req, res, next) => {
    res.clearCookie('isAuthenticated');
    res.clearCookie('userID');
    res.clearCookie('email');
    res.clearCookie('role_id');
    res.clearCookie('firstNm');
    res.clearCookie('lastNm');
    res.clearCookie('cookieTicket');
    res.status(200).send("logged out successfully");
})


router.post('/api/register', async (req, res, next) => {


    pool.query("select max(user_id) as id from tbl_users", (error, results) => {
        if (error) throw error;
        // console.log(results)

        let getNextUserId = parseInt(results.rows[0].id) + 1;

        if(isNaN(getNextUserId)){
            getNextUserId = 1;
        }

        console.log("getNextUserId : " + getNextUserId)

        var id = getNextUserId;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;

        var password = req.body.password;

        const salt = bcrypt.genSaltSync(10);

        const hashPassword = bcrypt.hashSync(password, salt);
        var role_id = 2;

        if (results.rowCount > 0) {
            pool.query("INSERT INTO tbl_users (user_id,firstname,lastname,email,password,role_id) VALUES ($1,$2,$3,$4,$5,$6)", [id, firstName, lastName, email, hashPassword, role_id], (error, results) => {
                if (error) throw error;
                console.log(results.rowCount)
                if (results.rowCount > 0) {
                    console.log("56456")
                    res.send("success")
                }
            })
        }



    })
})

router.get('/register', (req, res, next) => {

    res.sendFile(path.join(__dirname, "../views", 'register.html'))
})

// router.use((req, res, next) => {
//     const err = new Error(`
//     <html>
//     <head>
//         <title>404 Not Found</title>
//         <style>
//             body {
//                 font-family: Arial, sans-serif;
//                 background-color: #f2f2f2;
//             }
    
//             .container {
//                 width: 80%;
//                 max-width: 600px;
//                 margin: 0 auto;
//                 text-align: center;
//                 padding-top: 100px;
//             }
    
//             h1 {
//                 font-size: 5em;
//                 color: #333;
//                 margin-bottom: 0;
//             }
    
//             p {
//                 font-size: 1.5em;
//                 color: #666;
//                 margin-top: 0;
//             }
    
//             .btn {
//                 display: inline-block;
//                 background-color: #007bff;
//                 color: #fff;
//                 padding: 10px 20px;
//                 border-radius: 5px;
//                 text-decoration: none;
//                 margin-top: 20px;
//                 font-size: 1.2em;
//                 transition: all 0.3s ease;
//             }
    
//             .btn:hover {
//                 background-color: #0062cc;
//             }
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <h1>404</h1>
//             <p>Oops! The page you are looking for cannot be found.</p>
//             <a href="/" class="btn">Go to homepage</a>
//         </div>
//     </body>
//     </html>
//     `);
//     err.status = 404;
//     next(err);
//   });
  
  router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message);
  });

module.exports = router;