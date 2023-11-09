import React, { useState, useEffect } from "react";
import { Drawer, Button, Box, Text, Radio, CheckIcon, Divider, Group, Stack } from '@mantine/core';
import structuredClone from '@ungap/structured-clone';

import { useStore } from '../../../store';
import { DELETE } from "../../../routes";

export const DeleteDrawer = (props) => {
    const selectedFilename = useStore(state => state.selectedFilename)
    const associatedDir = useStore(state => state.associatedDir)
    const associatedDirCount = useStore(state => state.associatedDirCount)
    const setSelectedFilename = useStore(state => state.setSelectedFilename)
    const fetchDirs = useStore(state => state.fetchDirs)
    const setSelectedDir = useStore(state => state.setSelectedDir)
    const fetchDirFiles = useStore(state => state.fetchDirFiles)
    const resetActiveDirFilenames = useStore(state => state.resetActiveDirFilenames)
    const activeDirFilenames = useStore(state => state.activeDirFilenames)
    const removeByDirAndFilename = useStore(state => state.removeByDirAndFilename)
    
    let [confirmDelete, setConfirmDelete] = useState('')
    let [confirmDeleteFolder, setConfirmDeleteFolder] = useState('')
    const [submitDisabled, setSubmitDisabled] = useState(true)


    useEffect(() => {
        if ((associatedDirCount === 1 &&
            (confirmDelete === 'true' && 
            confirmDeleteFolder === 'true' || confirmDeleteFolder === 'false'))
            || 
            (associatedDirCount > 1 &&
            confirmDelete === 'true')) {
            setSubmitDisabled(false)
        }
        else {
            setSubmitDisabled(true)
        }
      }, [confirmDelete, confirmDeleteFolder, associatedDirCount, setSubmitDisabled]);   

    useEffect(() => {
        if (!props.opened) {
          setConfirmDelete('')
          setConfirmDeleteFolder('')
        }
    }, [props.opened, setConfirmDelete, setConfirmDeleteFolder]);

    const reset = () => {
        setConfirmDelete('')
        setConfirmDeleteFolder('')
        setSubmitDisabled(true)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (confirmDelete) {
            try {
                let url = confirmDeleteFolder === 'true' ?
                `${DELETE}?dir=${associatedDir}&filename=${selectedFilename}&ddir=Y` :
                `${DELETE}?dir=${associatedDir}&filename=${selectedFilename}`
                const response = await fetch(url, {
                    method: "GET",
                    mode: "no-cors", // no-cors, *cors, same-origin
                    cache: "default",
                    credentials: "same-origin",
                    // alternative to 'no-cors', but response is still opaque
                    // accessControlAllowOrigin: "*"
                })
                //
                const cArray = structuredClone(activeDirFilenames)
                const cDir = associatedDir.slice()
                const cFilename = selectedFilename.slice() 
                removeByDirAndFilename(associatedDir, selectedFilename)
                //
                setTimeout(() => {
                    resetActiveDirFilenames(cArray, cDir, cFilename)
                    setSelectedFilename()
                    if (confirmDeleteFolder === 'true') {
                        fetchDirs(setSelectedDir)
                    }
                    else {
                        fetchDirFiles(associatedDir)
                    }
                }, 200);
                setTimeout(() => {
                    reset()
                    props.close()
                  }, 500)
            //Issue: unable to inspect response here
            //opaque responses
            //https://stackoverflow.com/questions/45696999/fetch-unexpected-end-of-input
            }
            catch(error) {
                console.log(error)
            }
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
            title="Delete Selected WebChucK File"
        >
            <Box maw={340} mx="auto">
                <form onSubmit={onSubmit}>
                <Text c="rgb(250, 200, 152)" size="md">{`${associatedDir} \\ ${selectedFilename}`}</Text>
                <Text c="rgb(250, 200, 152)" size="md">{`${associatedDir} file count: ${associatedDirCount}`}</Text>
                <br />
                <Divider
                    size="md"
                    //label="Confirm Delete"
                    labelPosition="left"
                />
                <Radio.Group
                    value={confirmDelete}
                    onChange={setConfirmDelete}
                    name="confirmDelete"
                    label="Confirm Delete"
                    description="This cannot be undone."
                    withAsterisk
                    error={!confirmDelete ? 'Required' : ''}
                    >
                    <Stack mt="xs">
                        <Radio icon={CheckIcon} value='true' label="Yes, delete this file." />
                        <Radio
                            icon={CheckIcon}
                            value='false'
                            label="No, cancel."
                            onClick={(value) => {
                                setTimeout(() => {
                                    props.close()
                                    reset()
                                }, 1000);
                            }}
                        />
                    </Stack>
                </Radio.Group>
                {
                    associatedDirCount === 1 ?
                    <>
                        <br />
                        <Divider
                            size="md"
                            label="This is the last file in the folder."
                            labelPosition="left"
                        />
                        <Radio.Group
                            value={confirmDeleteFolder}
                            onChange={setConfirmDeleteFolder}
                            name="confirmDeleteFolder"
                            label="Also delete the folder?"
                            description="This cannot be undone."
                            withAsterisk
                            error={!confirmDeleteFolder ? 'Required' : ''}
                            >
                            <Stack mt="xs">
                                <Radio icon={CheckIcon} value='true' label="Yes, delete the folder." />
                                <Radio icon={CheckIcon} value='false' label="No, do not delete the folder." />
                            </Stack>
                        </Radio.Group>
                    </>
                    : ''
                }
                <Group justify="flex-end" mt="md">
                    { submitDisabled ?
                    <Button 
                        disabled
                        type="submit">Submit</Button> :
                    <Button
                        type="submit">Submit</Button>
                    }
                </Group>
                </form>
            </Box>
        </Drawer>
        </>
    )
}
