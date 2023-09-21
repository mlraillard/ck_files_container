const express = require('express')
const cors = require('cors')
const fs = require('fs')

const app = express()
const port = 8002

app.get('/onefile', cors(), (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text'})
    fs.readFile('./ckFiles/hoagScriptX.ck', function(error, data) {
        if (error) {
            res.writeHead(404)
            res.write('Error: File not found.')
        }
        else {
            res.write(data)
        }
        res.end()
    })
})

app.listen(port, function(error){
    if (error) {
        console.log(`error: ${error}`)
    }
    else {
        console.log(`server is listening on ${port}`)
    }
})

