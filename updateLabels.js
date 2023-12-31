const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const labelsRouter = express.Router()

labelsRouter.use(express.json())
labelsRouter.use(bodyParser.text({type:"*/*"}));

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

labelsRouter.post('/', (req, res) => { 
    console.log(`b1: ${req.body}`)
    console.log(`-------------------`);

    let body = bodyTransform(JSON.stringify(req.body))
    console.log(`b2: ${req.body}`)
    console.log(`-------------------`);

    fs.writeFileSync(`${__dirname}\/labels.js`, body, function (err) { console.log(err) });
    
    const resbody = 'labelsFile ok'
    // Calling response.writeHead method
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(resbody),
      'Content-Type': 'text/plain'
    });
    res.end(resbody)
})

module.exports = labelsRouter;