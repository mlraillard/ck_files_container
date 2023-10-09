import React, { useState, useEffect } from "react";
import { useDisclosure, useFocusWithin } from '@mantine/hooks';
import { Drawer, Box, Button, Group, Stack, FileInput, TextInput } from '@mantine/core';

import { UPLOAD } from "../../../routes";
import { useStore } from '../../../store';

export const UploadComponent = (props) => {
    const [opened, { open, close }] = useDisclosure(false)
    const [value, setValue] = useState(File | '')
    const [desc, setDesc] = useState('');
    const [fileContent, setFileContent] = useState('')
    const fetchDirFiles = useStore(state => state.fetchDirFiles)
    const { ref, focused } = useFocusWithin();

      useEffect(() => {
        if ((value && desc && !focused)) {
          loadFileContent(value)
          //setSubmitEnabled(true)
        }
      }, [value, desc, focused]);

      useEffect(() => {
        if (!opened) {
          setValue(null)
          setDesc('')
        }
      }, [close, setValue, setDesc]);

    const loadFileContent = (file) => {
        if (value && desc) {
            const reader = new FileReader()
            reader.readAsText(file)
            reader.onload = () => {
                const threeLines = 
                `<<< "${desc || (value.name).slice(0, -3) }" >>>;\n <<< "filename: ${value.name}" >>>;\n <<< "dir: ${props.dir}" >>>;\n `
                let result = threeLines.concat(reader.result)
                console.log(result)
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
                console.log("Delayed for .4 seconds");
                close()
              }, 400);
            setTimeout(() => {
                console.log("Delayed for 3 seconds.");
                fetchDirFiles(props.dir)
              }, 1900);

            // Issue: unable to inspect response here, but it is viewable in Network
            // is this a no-cors thing?
            //console.log(`${JSON.stringify(response)}`)
            //const rJson = await response.json()
            //const rText = JSON.stringify(rJson)
            //console.log(`rText: ${rText}`)
        }
        catch(error) {
            console.log(`fu3: 6`);
            console.error(e.message)
        }
    }

    return (
        <>
        <Drawer
            opened={opened}
            onClose={() => {
                close()
                setValue(null)
                setDesc('')
            }}
            title="Upload a ChucK File"
        >
            <Box maw={340} mx="auto">
                <form onSubmit={onSubmit}>
                    <FileInput
                        label="File"
                        description={`Directory: ${props.dir}`} 
                        placeholder="Choose file to upload"
                        value={value}
                        onChange={setValue}
                    />
                    <span 
                    ref={ref}
                    > 
                        <TextInput
                            label="Description"
                            placeholder="File display description"
                            value={desc} onChange={(e) => {setDesc(e.currentTarget.value)}}
                        />
                    </span>
                    <Group justify="flex-end" mt="md">
                        <Button 
                            type="submit"
                            //enabled={submitEnabled}
                        >Save File</Button>
                    </Group>
                </form>
            </Box>
        </Drawer>
  
        <Button onClick={open}>Upload</Button>
        </>
    )
}
