const http = require('http')
const fs = require('fs')
const port = 8002

const server = http.createServer(function(req, res) {
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

server.listen(port, function(error){
    if (error) {
        console.log(`error: ${error}`)
    }
    else {
        console.log(`server is listening on ${port}`)
    }
})

