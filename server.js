const express = require('express')
const cors = require('cors')
const fs = require('fs')

const app = express()
const SERVER_PORT = 8002;
const filesDirectory = './ckFiles'
const ckExtName = '.ck'
const re = /<{3}\s{0,20}\"([A-Za-z0-9,\. ]*)\"\s{0,20}>{3}\;/
const infinite_loop = /\/\/\s?(infinite_loop)\s?(\=){1,3}\s?(true|false|TRUE|FALSE)/

app.get('/onefile', cors(), (req, res) => {
    fs.readFile('./ckFiles/hoagScriptX.ck', function(error, data) {
        if (error) {
            res.writeHead(404)
            res.write('Error: File not found.')
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text'})
            res.write(data)
        }
        res.end()
    })
})

app.get('/ckfile', cors(), (req, res) => {    
    fs.readFile(`./ckFiles/${req.query.filename}`, function(error, data) {
        if (error) {
            res.writeHead(404)
            res.write('Error: File not found.')
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text'})
            res.write(data)
        }
        res.end()
    })
})

app.get('/ckfiles', cors(), (req, res) => {
    try {
        let filenames = fs.readdirSync(filesDirectory)
        if (filenames) {
            filenames = filenames.filter(file => file.endsWith(ckExtName))
        }
        let json = []
        filenames.forEach((filename) => {
            let desc = "no description"
            const fullFilename = `${filesDirectory}\/${filename}`
            const file = fs.readFileSync(fullFilename)
            const matches = re.exec(file)
            if (matches) {desc = matches[1]}

            let loop = "false"
            const loop_matches = infinite_loop.exec(file)
            if (loop_matches) {
                if (loop_matches[0].includes("true") || loop_matches[0].includes("TRUE")) {
                    loop = "true"
                }
            }

            json.push({
                "desc": desc,
                "loop": loop,
                "filename": filename
            })
        })
        res.writeHead(200, {'Content-Type': 'text'})
        res.write(JSON.stringify(json))
    }
    catch(error) {
        res.writeHead(404, { 'Content-Type': 'text'})
        res.write(`Error: cannot read directory: ${error}`)
    }
    res.end()
})

app.listen(SERVER_PORT, function(error){
    if (error) {
        console.log(`error: ${error}`)
    }
    else {
        console.log(`server is listening on ${SERVER_PORT}`)
    }
})

