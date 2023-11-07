import React, { useState, useEffect } from "react";
import { Drawer, Button, Box, Text, Radio, CheckIcon, Divider, Group } from '@mantine/core';

import { useStore } from '../../../store';

export const DeleteDrawer = (props) => {
    const dirCount = useStore(state => state.asyncDirFiles.length)
    const selectedDir = useStore(state => state.selectedDir)
    const selectedFilename = useStore(state => state.selectedFilename)
    let [confirmDelete, setConfirmDelete] = useState('');
    let [confirmDeleteFolder, setConfirmDeleteFolder] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(true)

    useEffect(() => {
        if ((dirCount === 1 &&
            (confirmDelete === 'true' && 
            confirmDeleteFolder === 'true'))
            || 
            (confirmDelete === 'true')) {
            setSubmitDisabled(false)
        }
      }, [confirmDelete, confirmDeleteFolder, dirCount, setSubmitDisabled]);   

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
                <Text c="rgb(250, 200, 152)" size="md">{`${selectedDir} \\ ${selectedFilename}`}</Text>
                <Text c="rgb(250, 200, 152)" size="md">{`${selectedDir} file count: ${dirCount}`}</Text>
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
                    <Group mt="xs">
                        <Radio icon={CheckIcon} value='true' label="Yes, delete the file." />
                        <Radio icon={CheckIcon} value='false' label="No, cancel." />
                    </Group>
                </Radio.Group>
                {
                    dirCount === 1 ?
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
                            <Group mt="xs">
                                <Radio icon={CheckIcon} value='true' label="Yes, delete the folder." />
                                <Radio icon={CheckIcon} value='false' label="No, cancel." />
                            </Group>
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
