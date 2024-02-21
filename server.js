const express = require('express')
const cors = require('cors')
const fs = require('fs')
const upload = require('./upload')
const updateLabels = require('./updateLabels')
const updateSettings = require('./updateSettings')
const labels = require('./labels')
const settings = require('./settings')
const { get } = require('http')

const app = express()

app.use(
    cors ({
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    })
)
app.use('/upload', upload)
app.use('/updateLabels', updateLabels)
app.use('/updateSettings', updateSettings)

// const SERVER_PORT = +process.env.PORT || 8002;
//const UPLOAD_SERVER_PORT = 8003;
const SERVER_PORT = 8002;
const filesDirectory = __dirname+'/ckFiles'
const ckExtName = '.ck'
const re = /<{3}\s{0,20}\"([\/A-Za-z0-9,\.\-\_ ]*)\"\s{0,20}>{3}\;/

const getFileCount = () => {
    let total = 0

    try {
        source = './ckFiles'
        let i = 0

    
        let dirs = fs.readdirSync(source, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name)
        while (i < dirs.length) {
            const length = fs.readdirSync(`./ckFiles/${dirs[i]}/`).length
            total += length
            i++;
        }
    }
    catch(error) {
        console.log(`fileCount err: ${JSON.stringify(error)}`)
    }

    return total
}

app.get('/onefile', (req, res) => {
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

app.get('/ckfiles', (req, res) => {
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
app.get('/ckdirfile', (req, res) => {
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

app.get('/ckdirs', (req, res) => {
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

app.get('/cksettings', (req, res) => {
    try {
        const inputString = settings;
        const keyValuePairs = inputString.split(',');
        const filteredKeyValuePairs = keyValuePairs.filter(item => item.trim() !== '');
        const jsonObject = {};

        filteredKeyValuePairs.forEach(pair => {
            pair = pair.substring(1)
            pair = pair.substring(0, pair.length - 1)
            const parts = pair.split('|');
            jsonObject[parts[0]] = isNaN(parts[1]) ? parts[1] : Number(parts[1]);
        });
        jsonObject["currentFiles"] = Number(getFileCount())
        res.writeHead(200, { 'Content-Type': 'text'})
        res.write(JSON.stringify(jsonObject))
    }
    catch(error) {
        res.writeHead(404, { 'Content-Type': 'text'})
        res.write(`Error: cannot read settings: ${error}`)
    }
    res.end()
})

app.get('/cklabels', (req, res) => {
    try {
        const inputString = labels;
        const pairs = inputString.split('|,|');
        const cleanedPairs = pairs.map(pair => pair.replace(/^\|/, '').replace(/\|$/, ''));
    
        let jsonArray = [];
        for (let i = 0; i < cleanedPairs.length; i++) {
            const pair = cleanedPairs[i].split('|');
            const obj = { value: pair[0], label: pair[1] }
            jsonArray.push(obj);
        }
        jsonArray.sort((a, b) => a.value.localeCompare(b.value));
        //console.log(`ja :${JSON.stringify(jsonArray)}`)
        res.writeHead(200, { 'Content-Type': 'text'})
        res.write(JSON.stringify(jsonArray))
    }
    catch(error) {
        res.writeHead(404, { 'Content-Type': 'text'})
        res.write(`Error: cannot read labels: ${error}`)
    }
    res.end()
})

app.get('/ckdirfiles', (req, res) => {
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

app.get('/ckdirfileRemove', (req, res) => {
    const url = `${filesDirectory}/${req.query.dir}/${req.query.filename}`
    const deleteDir = req.query.ddir

    fs.unlink(url, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({message: `Bad delete`})
        } else {
            if (deleteDir && deleteDir === 'Y') {
                const durl = `${filesDirectory}/${req.query.dir}`
                fs.rmdir(durl, (derr) => {
                    if (derr) {
                      console.log(derr);
                      res.status(500).json({message: `Bad dir delete: ${derr}`})
                    } else {
                        console.log('File and dir deleted successfully!');
                        res.status(200).json({message: `OK ${durl} ${url}`})
                    }
                });
            }
            else {
                console.log('File deleted successfully!');
                res.status(200).json({message: `OK ${url}`})
            }
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


app.get('/ckdirfileCount', (req, res) => {
        try {
            res.writeHead(200, { 'Content-Type': 'text'})
            res.write(JSON.stringify(getFileCount()))
        }
        catch(error) {
            res.writeHead(404, { 'Content-Type': 'text'})
            res.write(`Error: cannot read fileCount: ${error}`)
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

// uploadApp.listen(UPLOAD_SERVER_PORT, function(error){
//     if (error) {
//         console.log(`error: ${error}`)
//     }
//     else {
//         console.log(`server is listening on ${UPLOAD_SERVER_PORT}`)
//     }
// })

