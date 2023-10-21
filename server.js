const express = require('express')
const cors = require('cors')
const fs = require('fs')
const upload = require('./upload')

const app = express()

app.use('/upload', upload)

// const SERVER_PORT = +process.env.PORT || 8002;
//const UPLOAD_SERVER_PORT = 8003;
const SERVER_PORT = 8002;
const filesDirectory = __dirname+'/ckFiles'
const ckExtName = '.ck'
const re = /<{3}\s{0,20}\"([A-Za-z0-9,\.\-\_ ]*)\"\s{0,20}>{3}\;/

app.get('/onefile', cors(), (req, res) => {
    fs.readFile(`${filesDirectory}/hoagScriptX.ck`, function(error, data) {
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
    fs.readFile(`${filesDirectory}/${req.query.filename}`, function(error, data) {
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

            json.push({
                "desc": desc,
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

//to work on multiple directories
app.get('/ckdirfile', cors(), (req, res) => {
    fs.readFile(`${filesDirectory}/${req.query.dir}/${req.query.filename}`, function(error, data) {
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

app.get('/ckdirs', cors(), (req, res) => {
    let dirs = []

    try {
        const files = fs.readdirSync(filesDirectory);
        for (const file of files) {
            const stats = fs.statSync(`${filesDirectory}/${file}`);

            if (stats.isDirectory()) {
                dirs.push(file)
            }
        }
        res.writeHead(200, { 'Content-Type': 'text'})
        res.write(JSON.stringify(dirs))
    }
    catch(error) {
        res.writeHead(404, { 'Content-Type': 'text'})
        res.write(`Error: cannot read directories: ${error}`)
    }
    res.end()
})

app.get('/ckdirfiles', cors(), (req, res) => {
    try {
        let filenames = fs.readdirSync(`${filesDirectory}\/${req.query.dir}`)
        if (filenames) {
            filenames = filenames.filter(file => file.endsWith(ckExtName))
        }
        let json = []
        filenames.forEach((filename) => {
            let desc = "no description"
            const fullFilename = `${filesDirectory}\/${req.query.dir}\/${filename}`
            const file = fs.readFileSync(fullFilename)
            const matches = re.exec(file)
            if (matches) {desc = matches[1]}

            json.push({
                "desc": desc,
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

app.get('/ckdirfileRemove', cors(), (req, res) => {
    const url = `${filesDirectory}/${req.query.dir}/${req.query.filename}}`

    
    fs.unlink(url, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({message: `Bad delete`})
        } else {
          console.log('File deleted successfully!');
          res.status(200).json({message: url})
        }
    });


    // //console.log(`url: ${url}`)
    // try {
    //     fs.unlinkSync(url);
    // //     res.writeHead(200, { 'Content-Type': 'text'})
    // //     res.write("file deleted")
    // res.status(200).json({message: url})
    // }
    // catch(error) {
    //     res.status(200).json({message: `BAD BAD BAD`})
    // //     res.writeHead(500)
    // //     res.write('Error: Problem deleting file.')
    // }
    // //res.status(200).json({message: url})
})

app.listen(SERVER_PORT, function(error){
    if (error) {
        console.log(`error: ${error}`)
    }
    else {
        console.log(`server is listening on ${SERVER_PORT}`)
    }
})

// uploadApp.listen(UPLOAD_SERVER_PORT, function(error){
//     if (error) {
//         console.log(`error: ${error}`)
//     }
//     else {
//         console.log(`server is listening on ${UPLOAD_SERVER_PORT}`)
//     }
// })

