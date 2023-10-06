const express = require('express')
const fs = require('fs')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true}))

const regexReplace = (body, regex, replacement) => {
    return body.replace(regex, replacement)
}

const bodyTransform = (body) => {
    body = body.slice(2)
    body = body.slice(0, -2)

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
    console.log(`hi from upload router`)

    let body = bodyTransform(JSON.stringify(req.body))
    // fs.writeFileSync('one.ck', body);

    const filename = getFilename(body)
    console.log(filename)
    const dir = getDirectory(body)
    console.log(dir)

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