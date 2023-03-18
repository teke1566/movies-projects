
const express = require('express');
const router = express.Router();
const path = require('path')

let pool = require('../db');
router.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'login.html'))
})

router.post("/login", (req, res)=>{
    //login logic
})

module.exports = router;