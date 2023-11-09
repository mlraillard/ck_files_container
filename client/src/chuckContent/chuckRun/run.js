import { DIRECTORY_FILE } from '../../routes'

async function run(aPromise, setResultText) {
    setResultText(await aPromise);
}

export async function loadAndRunChucKCode(
    filename,
    setResultText,
    Chuck,
    dir,
    // you want to store the dir count here..
    qPush,
    setActiveDirFilenames,
    setSelectedFilename,
    associatedDirCount
    ) {
    let url = `${DIRECTORY_FILE}${dir}&filename=${filename}`

    let aPromise = new Promise( async function(resolve, reject) {
        //let aChuck = await Chuck.init([], undefined, undefined, "../chuckSrc/");
        const response = await fetch(url)
        const data = await response.text()
        let aChuck = await Chuck.init([])

        // loading audio plugins....
        // audioPlugin is opened successfully, but format is not recognized
        //let auxResponse = await aChuck.loadFile('./guitar.wav')

        aChuck.chuckPrint = (output) => {
            setResultText(output);
        }
        aChuck.runCode(data).then((id) => {
            const track = {
                id: id,
                filename: filename,
                dir: dir,
                associatedDirCount: associatedDirCount,
                aChuck: aChuck
            }
            qPush(track)
            setActiveDirFilenames()
            setSelectedFilename()
        })
        await new Promise((resolve, reject) => { setTimeout(resolve, 750)});
    });
    run(aPromise);
}

export function runChucKCode(Chuck, code) {
    let aPromise = new Promise( async function(resolve, reject) {
        let aChuck = await Chuck.init([]);

        aChuck.chuckPrint = (output) => {}
        aChuck.runCode(code);
        await new Promise((resolve, reject) => { setTimeout(resolve, 750)});
      });
      run(aPromise);
}

