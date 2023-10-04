const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

router.post('/', (req, res) => {
    console.log(`hi from upload router`)
    console.log(req.body) // this workds
    // console.log(req.body.dir) // this does not work
    
    res.status(200).json({message: "Yes, this is OK"})
    
    // const resbody = 'ok'
    // // Calling response.writeHead method
    // res.writeHead(200, {
    //   'Content-Length': Buffer.byteLength(resbody),
    //   'Content-Type': 'text/plain'
    // });
    // res.end(resbody)
})

module.exports = router;