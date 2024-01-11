import React, { useState, useEffect } from "react";
import { useFocusWithin } from '@mantine/hooks';
import { Drawer, Radio, Select, Box, Button, Group, Stack, FileInput, TextInput} from '@mantine/core';

import { UPLOAD, UPDATE_LABELS } from "../../../routes";
import { useStore } from '../../../store';
import { formatLabelsFile } from "../../../utils";

export const UploadDrawer = (props) => {
    
    const [newFolder, setNewFolder] = useState('false');
    const [dir, setDir] = useState('');
    const [dirDesc, setDirDesc] = useState('');
    const [invalidFoldername, setInvalidFoldername] = useState(false)
    const [invalidDirError, setInvalidDirError] = useState('')

    const [invalidFiledesc, setInvalidFiledesc] = useState(false)
    const [invalidFiledescError, setInvalidFiledescError] = useState('')

    const [invalidFoldedesc, setInvalidFolderdesc] = useState(false)
    const [invalidFolderdescError, setInvalidFolderdescError] = useState('')
    const [value, setValue] = useState(File | '')
    const [invalidFilename, setInvalidFilename] = useState(false)
    const [invalidError, setInvalidError] = useState('')
    const [desc, setDesc] = useState('');
    const [fileContent, setFileContent] = useState('')
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const asyncDirsX = useStore(state => state.asyncDirsX)
    const selectedDir = useStore(state => state.selectedDir)
    const setSelectedDir = useStore(state => state.setSelectedDir)
    const fetchDirs = useStore(state => state.fetchDirs)
    const fetchDirFiles = useStore(state => state.fetchDirFiles)
    const asyncDirFiles = useStore(state => state.asyncDirFiles)
    const { ref, focused } = useFocusWithin();

    const reset = () => {
        setValue(null)
        setDesc('')
        setSubmitDisabled(true)
        setInvalidError('')
        setNewFolder('false')
        setDir('')
        setDirDesc('')
        setInvalidFoldername(false)
        setInvalidDirError('')
    }

    const loadFileContent = (file) => {
        if (value && desc) {
            const theDir = newFolder === 'true' && dir ? dir : selectedDir
            const reader = new FileReader()
            reader.readAsText(file)
            reader.onload = () => {
                const threeLines = 
                `<<< "${desc || (value.name).slice(0, -3) }" >>>;\n <<< "filename: ${value.name}" >>>;\n <<< "dir: ${theDir}" >>>;\n `
                let result = threeLines.concat(reader.result)
                //console.log(result)
                setFileContent(result)
            }
        }
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();

        const labelsFile = newFolder === 'true' ?
            formatLabelsFile(asyncDirsX, dir, dirDesc, false) : false
        
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
            }).then(
                !labelsFile ? resolve('') :
                await fetch(UPDATE_LABELS, {
                    method: "POST",
                    mode: "no-cors", // no-cors, *cors, same-origin
                    cache: "default",
                    credentials: "same-origin",
                    headers: {
                       'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: labelsFile
                })
            )
            setTimeout(() => {
                reset()
                props.close()
            }, 400);
            if (labelsFile) {
                setTimeout(() => {
                    fetchDirs(setSelectedDir)
                }, 1100);
            }
            setTimeout(() => {
                fetchDirFiles(
                    selectedDir
                )
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

    useEffect(() => {
        if (newFolder === 'true') {
            let mf = (dir).match(/^([0-9a-zA-Z_-]{1,25})$/) || [false,false][1];
            //console.log(`aX: ${JSON.stringify(asyncDirsX)}`)
            let dupFoldername = asyncDirsX.filter(e => e.value === dir).length > 0
            let dupFolderdesc = asyncDirsX.filter(e => e.value === dir).length > 0

            if (mf === false) {
                setInvalidFoldername(true)
                setInvalidDirError("Invalid folder name.")
            }
            else if (dupFoldername === true) {
                setInvalidFoldername(true)
                setInvalidDirError("Duplicate folder name.")
            }
            else {
                setInvalidFoldername(false)
                setInvalidDirError('')
            }
            //
            if (dupFolderdesc === true) {
                setInvalidFolderdesc(true)
                setInvalidFolderdescError("Duplicate folder description.")
            }
            else {
                setInvalidFolderdesc(false)
                setInvalidFolderdescError('')
            }
        }
      }, [
        newFolder,
        dir,
        setInvalidFoldername,
        setInvalidDirError,
        setInvalidFolderdesc,
        setInvalidFolderdescError
    ]);

      useEffect(() => {
        if (value) {
            const filenames = asyncDirFiles.map((object) => object.filename);
            let m = (value.name).match(/^([0-9a-zA-Z_-]{1,25})\.ck/) || [false,false][1]

            console.log(`asF: ${JSON.stringify(asyncDirFiles)}`)
            let dupFiledesc = asyncDirFiles.filter(e => e.asyncDirFiles === dir).length > 0


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
            }
            //
            if (dupFiledesc === true) {
                setInvalidFiledesc(true)
                setInvalidFiledescError("Duplicate file description.")
            }
            else {
                setInvalidFiledesc(false)
                setInvalidFiledescError('')
            }
            //
            if ((value && desc &&
                !invalidFoldedesc && !invalidFoldername && !invalidFilename && !invalidFiledesc && 
                !focused)) {
                setSubmitDisabled(false)
                loadFileContent(value)
            }
        }
      }, [value, desc, focused, setSubmitDisabled, setInvalidFilename, setInvalidFiledesc, setInvalidFiledescError, invalidFoldedesc, invalidFoldername, invalidFilename, invalidFiledesc]);

      useEffect(() => {
        if (!props.opened) {
            reset()
        }
    }, [props.opened, reset]);

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
            <Radio.Group
                value={newFolder}
                onChange={setNewFolder}
                >
                <Group mt="xs">
                    <Radio value="false" label="Use existing folder" />
                    <Radio value="true" label="Create new folder" />
                </Group>
            </Radio.Group>
                    { newFolder === 'false' ?
                        <Select
                        label="Folder"
                        data={asyncDirsX}
                        value={selectedDir}
                        onChange={(e) => {
                            setDir(e.currentTarget.value)
                        }}/>
                        :
                        newFolder === 'true' && invalidFoldername ?
                        <>
                        <TextInput
                            label="Folder name"
                            placeholder="Type new folder name"
                            value={dir}
                            onChange={(e) => {setDir(e.currentTarget.value)}}
                            error={invalidDirError}
                            withAsterisk
                        />
                        <TextInput
                            label="Folder description"
                            placeholder="Type new folder description"
                            value={dirDesc}
                            onChange={(e) => {setDirDesc(e.currentTarget.value)}}
                            error={invalidFolderdescError}
                            withAsterisk
                        />
                        </>

                        :
                        <>
                        <TextInput
                            label="Folder name"
                            placeholder="Type new folder name"
                            value={dir}
                            onChange={(e) => {setDir(e.currentTarget.value)}}
                            withAsterisk
                        />
                        <TextInput
                            label="Folder description"
                            placeholder="Type new folder description"
                            value={dirDesc}
                            onChange={(e) => {setDirDesc(e.currentTarget.value)}}
                            withAsterisk
                        />
                        </>
                    }
                    <br />
                    {
                    invalidFilename ?
                    <FileInput
                        label="File"
                        description={
                            newFolder === 'true' ? 
                            `Directory: ${dir}` :
                            `Directory: ${selectedDir}`
                        } 
                        placeholder="Choose file to upload"
                        value={value}
                        onChange={setValue}
                        error={invalidError}
                        withAsterisk
                    />
                    :
                    <FileInput
                        label="File"
                        description={
                            newFolder === 'true' ? 
                            `Directory: ${dir}` :
                            `Directory: ${selectedDir}`
                        } 
                        placeholder="Choose file to upload"
                        value={value}
                        onChange={setValue}
                        error={invalidFiledescError}
                        withAsterisk
                    />
                    }
                    <span ref={ref}> 
                        <TextInput
                            label="File description"
                            placeholder="File display description"
                            value={desc} onChange={(e) => {setDesc(e.currentTarget.value)}}
                            withAsterisk
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
