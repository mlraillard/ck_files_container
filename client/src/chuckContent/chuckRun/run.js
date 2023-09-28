import { SERVER_HOST, SERVER_PORT} from '../../constants'

let CKFILE_API_URL = `${SERVER_HOST}\:${SERVER_PORT}\/ckFile?filename=`
let Chuck = import('../chuckSrc/wc-bundle.js').then(async (module) => { Chuck = module.Chuck; });

async function run(aPromise, setResultText) {
    setResultText(await aPromise);
}

export function runChucKCode(code, setResultText) {
    let aPromise = new Promise( async function(resolve, reject) {
        //let aChuck = await Chuck.init([], undefined, undefined, "../chuckSrc/");
        let aChuck = await Chuck.init([]);

        aChuck.chuckPrint = (output) => {
            setResultText(output);
        }
        aChuck.runCode(code);        
        await new Promise((resolve, reject) => { setTimeout(resolve, 750)});
    });
    run(aPromise);
}

export async function loadAndRunChucKCode(filename, setResultText) {
    const url = `${SERVER_HOST}\:${SERVER_PORT}\/ckfile?filename=${filename}`

    let aPromise = new Promise( async function(resolve, reject) {
        //let aChuck = await Chuck.init([], undefined, undefined, "../chuckSrc/");
        const response = await fetch(url)
        const data = await response.text()
        let aChuck = await Chuck.init([]);

        aChuck.chuckPrint = (output) => {
            setResultText(output);
        }
        aChuck.runCode(data);        
        await new Promise((resolve, reject) => { setTimeout(resolve, 750)});
    });
    run(aPromise);
}

