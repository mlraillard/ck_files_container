import React, { useState, useEffect } from "react";
import { useFocusWithin } from '@mantine/hooks';
import { Drawer, Box, Button, Group, Stack, FileInput, TextInput} from '@mantine/core';

import { UPLOAD } from "../../../routes";
import { useStore } from '../../../store';

export const UploadDrawer = (props) => {
    
    const [value, setValue] = useState(File | '')
    const [invalidFilename, setInvalidFilename] = useState(false)
    const [invalidError, setInvalidError] = useState('')
    const [desc, setDesc] = useState('');
    const [fileContent, setFileContent] = useState('')
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const selectedDir = useStore(state => state.selectedDir)
    const fetchDirFiles = useStore(state => state.fetchDirFiles)
    const asyncDirFiles = useStore(state => state.asyncDirFiles)
    const { ref, focused } = useFocusWithin();

      useEffect(() => {
        if (value) {
            const filenames = asyncDirFiles.map((object) => object.filename);
            let m = (value.name).match(/^([0-9a-zA-Z_-]{1,25})\.ck/) || [false,false][1]
            if (m === false) {
                setInvalidFilename(true)
                setInvalidError("Invalid ChucK filename.")
            }
            else if (filenames.includes(value.name)) {
                setInvalidFilename(true)
                setInvalidError("Duplicate filenames are not allowed.")
            }
            else {
                setInvalidFilename(false)
                setInvalidError('')
                if ((value && desc && !focused)) {
                    setSubmitDisabled(false)
                    loadFileContent(value)
                }
            }
        }
      }, [value, desc, focused, setSubmitDisabled, setInvalidFilename]);

      useEffect(() => {
        if (!props.opened) {
          setValue(null)
          setDesc('')
        }
      }, [props.close, setValue, setDesc]);

    const reset = () => {
        setValue(null)
        setDesc('')
        setSubmitDisabled(true)
        setInvalidError('')
    }

    const loadFileContent = (file) => {
        if (value && desc) {
            const reader = new FileReader()
            reader.readAsText(file)
            reader.onload = () => {
                const threeLines = 
                `<<< "${desc || (value.name).slice(0, -3) }" >>>;\n <<< "filename: ${value.name}" >>>;\n <<< "dir: ${selectedDir}" >>>;\n `
                let result = threeLines.concat(reader.result)
                //console.log(result)
                setFileContent(result)
            }
        }
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(UPLOAD, {
                method: "POST",
                mode: "no-cors", // no-cors, *cors, same-origin
                cache: "default",
                credentials: "same-origin",
                headers: {
                   'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: fileContent
            })
            setTimeout(() => {
                //console.log("Delayed for .4 seconds");
                reset()
                props.close()
              }, 400);
            setTimeout(() => {
                //console.log("Delayed for 3 seconds.");
                fetchDirFiles(selectedDir)
              }, 1900);

            // Issue: unable to inspect response here, but it is viewable in Network
            // is this a no-cors thing?
            //console.log(`${JSON.stringify(response)}`)
            //const rJson = await response.json()
            //const rText = JSON.stringify(rJson)
            //console.log(`rText: ${rText}`)
        }
        catch(error) {
            console.error(e.message)
        }
    }

    return (
        <>
        <Drawer
            opened={props.opened}
            onClose={() => {
                props.close()
                reset()
            }}
            title="Upload a ChucK File"
        >
            <Box maw={340} mx="auto">
                <form onSubmit={onSubmit}>
                    {
                    invalidFilename ?
                    <FileInput
                        label="File"
                        description={`Directory: ${selectedDir}`} 
                        placeholder="Choose file to upload"
                        value={value}
                        onChange={setValue}
                        error={invalidError}
                    />
                    :
                    <FileInput
                        label="File"
                        description={`Directory: ${selectedDir}`} 
                        placeholder="Choose file to upload"
                        value={value}
                        onChange={setValue}
                    />
                    }
                    <span ref={ref}> 
                        <TextInput
                            label="Description"
                            placeholder="File display description"
                            value={desc} onChange={(e) => {setDesc(e.currentTarget.value)}}
                        />
                    </span>
                    <Group justify="flex-end" mt="md">
                        { submitDisabled ?
                        <Button 
                            disabled
                            type="submit">Save File</Button> :
                        <Button
                            type="submit">Save File</Button>
                        }
                    </Group>
                </form>
            </Box>
        </Drawer>
        </>
    )
}
