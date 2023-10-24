import React, { useState, useEffect } from "react";
import { useDisclosure, useFocusWithin } from '@mantine/hooks';
import { Anchor, Drawer, Box, Button, Group, Stack, FileInput, TextInput, ActionIcon } from '@mantine/core';

import { UPLOAD } from "../../../routes";
import { useStore } from '../../../store';

export const UploadAnchor = () => {
    const [opened, { open, close }] = useDisclosure(false)
    const [value, setValue] = useState(File | '')
    const [invalidFilename, setInvalidFilename] = useState(false)
    const [desc, setDesc] = useState('');
    const [fileContent, setFileContent] = useState('')
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const selectedDir = useStore(state => state.selectedDir)
    const fetchDirFiles = useStore(state => state.fetchDirFiles)
    const { ref, focused } = useFocusWithin();

      useEffect(() => {
        if (value) {
            let m = (value.name).match(/^([0-9a-zA-Z_-]{1,25})\.ck/) || [false,false][1]
            if (m === false) {
                setInvalidFilename(true)
            }
            else {
                setInvalidFilename(false)
                if ((value && desc && !focused)) {
                    setSubmitDisabled(false)
                    loadFileContent(value)
                }
            }
        }
      }, [value, desc, focused, setSubmitDisabled, setInvalidFilename]);

      useEffect(() => {
        if (!opened) {
          setValue(null)
          setDesc('')
        }
      }, [close, setValue, setDesc]);

    const reset = () => {
        setValue(null)
        setDesc('')
        setSubmitDisabled(true)
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
                close()
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
            //console.log(`fu3: 6`);
            console.error(e.message)
        }
    }

    return (
        <>
        <Drawer
            opened={opened}
            onClose={() => {
                close()
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
                        error="Invalid ChucK filename"
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
  
        <Anchor
            component="button"
            style={{ fontSize: 'calc(10px + 0.390625vw)'}}
            onClick={open}>Upload</Anchor>
        </>
    )
}
