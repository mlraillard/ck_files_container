const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const settingsRouter = express.Router()

settingsRouter.use(express.json())
settingsRouter.use(bodyParser.text({type:"*/*"}));

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

settingsRouter.post('/', (req, res) => {
    let body = bodyTransform(JSON.stringify(req.body))
    fs.writeFileSync(`${__dirname}\/settings.js`, body, function (err) { console.log(err) });
    
    const resbody = 'settingsFile ok'
    // Calling response.writeHead method
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(resbody),
      'Content-Type': 'text/plain'
    });
    res.end(resbody)
})

module.exports = settingsRouter;