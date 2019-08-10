const express = require('express');
const router = express.Router();

router.get('/',(req, res) =>{
    res.send('welcome to Library');
})

router.get('/about', (req, res)=>{
    res.send('we successful story')
})

module.exports = router;



