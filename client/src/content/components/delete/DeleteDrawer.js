import React, { useState, useEffect } from "react";
import { Drawer, Button, Box, Text, Radio, CheckIcon, Divider, Group, Stack } from '@mantine/core';

import { useStore } from '../../../store';

export const DeleteDrawer = (props) => {
    const selectedFilename = useStore(state => state.selectedFilename)
    const associatedDir = useStore(state => state.associatedDir)
    const associatedDirCount = useStore(state => state.associatedDirCount)
    let [confirmDelete, setConfirmDelete] = useState('')
    let [confirmDeleteFolder, setConfirmDeleteFolder] = useState('')
    const [submitDisabled, setSubmitDisabled] = useState(true)

    useEffect(() => {
        if ((associatedDirCount === 1 &&
            (confirmDelete === 'true' && 
            confirmDeleteFolder === 'true'))
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
        console.log(`delete submit was clicked`)

        try {

            // let url = `${DIRECTORY_FILE}${dir}&filename=${filename}`

            // let aPromise = new Promise( async function(resolve, reject) {
            //     //let aChuck = await Chuck.init([], undefined, undefined, "../chuckSrc/");
            //     const response = await fetch(url)
            //     const data = await response.text()


            // const response = await fetch(UPLOAD, {
            //     method: "POST",
            //     mode: "no-cors", // no-cors, *cors, same-origin
            //     cache: "default",
            //     credentials: "same-origin",
            //     headers: {
            //        'Content-Type': 'application/x-www-form-urlencoded'
            //     },
            //     body: fileContent
            // })
            // setTimeout(() => {
            //     //console.log("Delayed for .4 seconds");
            //     reset()
            //     props.close()
            //   }, 400);
            // setTimeout(() => {
            //     //console.log("Delayed for 3 seconds.");
            //     fetchDirFiles(selectedDir)
            //   }, 1900);

            // // Issue: unable to inspect response here, but it is viewable in Network
            // // is this a no-cors thing?
            // //console.log(`${JSON.stringify(response)}`)
            // //const rJson = await response.json()
            // //const rText = JSON.stringify(rJson)
            // //console.log(`rText: ${rText}`)
        }
        catch(error) {
            // console.error(e.message)
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
