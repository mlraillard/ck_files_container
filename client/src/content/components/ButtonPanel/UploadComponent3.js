import React, { useState, useEffect, createRef } from "react";
import { UPLOAD } from "../../../routes";

export const UploadComponent3 = (props) => {
    const fileInput = createRef();
    
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("avatar", fileInput.current.value);
        formData.set("dir", props.dir);

        for (let pair of formData.entries()) {
            console.log(pair[0]+ ': ' + pair[1]); 
        }

        try {
            console.log(`fu3: 1`);
            const response = await fetch(UPLOAD, {
                method: "POST",
                mode: "no-cors", // no-cors, *cors, same-origin
                cache: "default",
                credentials: "same-origin",
                headers: {
                  //"Content-Type": "application/json",
                   //'Content-Type': 'multipart/form-data',
                   //'Content-Type': 'text/plain',
                   'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData
            })
            const rText = await response.text()
            // unable to inspect response here, but it is viewable in Network??
            console.log(`rText: ${rText}`)
        }
        catch(error) {
            console.log(`fu3: 6`);
            console.error(e.message)
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="file" name="avatar" ref={fileInput} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}