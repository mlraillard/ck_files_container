const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    console.log(`hi from upload router`)
    console.log(req.body)
    console.log(`\n\n`)
    // for (let pair of req.body.entries()) {
    //     console.log(pair[0]+ ': ' + pair[1]); 
    // }
    
    const resbody = 'ok'
    
    // Calling response.writeHead method
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(resbody),
      'Content-Type': 'text/plain'
    });
    res.end(resbody)
})

module.exports = router;