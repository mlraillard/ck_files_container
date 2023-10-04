import React, { useState, useEffect, createRef } from "react";
import { UPLOAD } from "../../../routes";

export const UploadComponent3 = (props) => {
    const [fileContent, setFileContent] = useState('');
    const [filename, setFilename] = useState('');

    const onChange = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = () => {
            setFilename(file.name)
            setFileContent(reader.result)
        }
    };
    
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('filename', filename)
        formData.set('fileContent', fileContent)
        formData.set('dir', props.dir)

        try {
            console.log(`fu3: 1`);
            const response = await fetch(UPLOAD, {
                method: "POST",
                mode: "no-cors", // no-cors, *cors, same-origin
                cache: "default",
                credentials: "same-origin",
                headers: {
                   //   "Content-Type": "application/json", NOT ALLOWED with NO CORS
                   //'Content-Type': 'multipart/form-data',
                   //'Content-Type': 'text/plain',
                   'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData
            })
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
        <div>{fileContent}</div>
        </div>
    )
}