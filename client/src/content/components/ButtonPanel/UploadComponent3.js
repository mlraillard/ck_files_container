import React, { useState, useEffect, createRef } from "react";
import { UPLOAD } from "../../../routes";
import { useStore } from '../../../store';

export const UploadComponent3 = (props) => {
    const [desc, setDesc] = useState('');
    const [fileContent, setFileContent] = useState('');
    const fetchDirFiles = useStore(state => state.fetchDirFiles)

    const onChange = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = () => {
            const threeLines = 
            `<<< "${desc || (file.name).slice(0, -3) }" >>>;\n <<< "filename: ${file.name}" >>>;\n <<< "dir: ${props.dir}" >>>;\n `
            let result = threeLines.concat(reader.result)
            setFileContent(result)
        }
    };
    
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(`fu3: 1`);
            const response = await fetch(UPLOAD, {
                method: "POST",
                mode: "no-cors", // no-cors, *cors, same-origin
                cache: "default",
                credentials: "same-origin",
                headers: {
                   //"Content-Type": "application/json", NOT ALLOWED with NO CORS
                   //'Content-Type': 'multipart/form-data',
                   //'Content-Type': 'text/plain',
                   'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: fileContent
            })
            setTimeout(() => {
                console.log("Delayed for 3 seconds.");
                fetchDirFiles(props.dir)
              }, 1900);
            const rJson = await response.json()
            const rText = JSON.stringify(rJson)
            console.log(`rText: ${rText}`)

            //const rText = await response.text()
            //// unable to inspect response here, but it is viewable in Network??
            //console.log(`rText: ${rText}`)
        }
        catch(error) {
            console.log(`fu3: 6`);
            console.error(e.message)
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>                
                <input
                    type='file'
                    onChange={onChange}
                />
                <input type="submit" value="Submit" />
            </form>
        {/* <div>{fileContent}</div> */}
        </div>
    )
}