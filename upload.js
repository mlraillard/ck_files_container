const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const router = express.Router()
const filesDirectory = __dirname+'\/ckFiles'

router.use(express.json())
//router.use(express.urlencoded({ extended: true}))
router.use(bodyParser.text({type:"*/*"}));
// app.use(bodyParser.text());

const regexReplace = (body, regex, replacement) => {
    return body.replace(regex, replacement)
}

const bodyTransform = (body) => {
    body = body.slice(1)
    body = body.slice(0, -1)

    //known issues in req.body text:
    const regs = [/\\"/g, /\\n/g, /\"\:\"\>/g ]
    const subs = ['"', '\n', '=>']
    for (let i = 0; i < regs.length; i++) {
        body = regexReplace(body, regs[i], subs[i])
    }
    return body
}

const getFilename = (body) => {
    const re = /<{3}\s?\"filename:\s?([a-zA-Z0-9\[\]\*\s\:\_\-\.\,\^\#\@\(\)\/]*)\"\s?>{3}/
    const matches =  re.exec(body)
    return matches[1]
}

const getDirectory = (body) => {
    const re = /<{3}\s?\"dir:\s?([a-zA-Z0-9\[\]\*\s\:\_\-\.\,\^\#\@\(\)\/]*)\"\s?>{3}/
    const matches =  re.exec(body)
    return matches[1]
}

router.post('/', (req, res) => { 
    //console.log(`b1: ${req.body}`)
    //console.log(`-------------------`);

    let body = bodyTransform(JSON.stringify(req.body))
    //console.log(`b2: ${req.body}`)
    //console.log(`-------------------`);
    const filename = getFilename(body)
    const dir = getDirectory(body)
    //console.log(`filename: ${filename}`)
    //console.log(`dir: ${dir}`)
     fs.writeFileSync(`\/${filesDirectory}\/${dir}\/${filename}`, body, function (err) {
         console.log(err)
    });
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