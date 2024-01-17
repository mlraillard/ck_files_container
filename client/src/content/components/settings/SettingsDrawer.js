import React, { useState, useEffect } from "react";
import { useFocusWithin } from '@mantine/hooks';
import { Button, Group, Drawer, Box, Select, Switch, TextInput } from '@mantine/core';

import { useStore } from '../../../store';
import { compareChangeBooleanToString } from '../../../utils';

export const SettingsDrawer = (props) => {
    const { ref, focused } = useFocusWithin();

    const settings = useStore(state => state.settings)
    const settingsMaxTracks = settings.maxTracks + ''
    const settingsMaxFiles = settings.maxFiles + ''
    const settingsAudioFileCapability = settings.audioFileCapability === 'true'
    const settingsEnableUpload = settings.enableUpload === 'true'
    const settingsEnableDelete = settings.enableDelete === 'true'
    const settingsEnableView = settings.enableView === 'true'
    const settingsTitle = settings.title
        
    const [submitDisabled, setSubmitDisabled] = useState(true)
    //const [maxTracks, setMaxTracks] = useState<string | null>(null); 
    const [maxTracks, setMaxTracks] = useState(null)
    const [maxFiles, setMaxFiles] = useState(null)
    const [audioFileCapability, setAudioFileCapability] = useState(null)
    const [enableUpload, setEnableUpload] = useState(null)
    const [enableDelete, setEnableDelete] = useState(null)
    const [enableView, setEnableView] = useState(null)
    const [title, setTitle] = useState(null)

    const reset = () => {
        setMaxTracks(null)
        setMaxFiles(null)
        setAudioFileCapability(null)
        setEnableUpload(null)
        setEnableDelete(null)
        setEnableView(null)
        setTitle(null)
        setSubmitDisabled(true)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(`going thru onSubmit...`)
    }

    useEffect(() => {
        const tracksChanged = maxTracks && (parseInt(maxTracks + '') !== parseInt(settings.maxTracks + ''))
        const filesChanged = maxFiles && (parseInt(maxFiles + '') !== parseInt(settings.maxFiles + ''))
        const audioChanged = compareChangeBooleanToString(audioFileCapability, settings.audioFileCapability)
        const uploadChanged = compareChangeBooleanToString(enableUpload, settings.enableUpload)
        const deleteChanged = compareChangeBooleanToString(enableDelete, settings.enableDelete)
        const viewChanged = compareChangeBooleanToString(enableView, settings.enableView)
        const titleChanged = title && title !== settings.title

        if ( tracksChanged || filesChanged || audioChanged || uploadChanged || deleteChanged || viewChanged || titleChanged) {
            setSubmitDisabled(false)
        }
        else {
            setSubmitDisabled(true)
            console.log(`no change`)
        }
      }, [
        settings,
        maxTracks,
        maxFiles,
        audioFileCapability,
        enableUpload,
        enableDelete,
        enableView,
        title,
        setSubmitDisabled
    ]);

    console.log(`settings: ${JSON.stringify(settings)}`)

    return (
        <>
        <Drawer
            opened={props.opened}
            onClose={() => {
                props.close()
                reset()
            }}
            title="Customize the WebChucK Player"
        >
            <Box maw={340} mx="auto">
                <form onSubmit={onSubmit}>
                    <Select
                        label="Maximum Tracks"
                        value={
                            maxTracks === undefined || maxTracks === null ?
                            settingsMaxTracks : maxTracks
                        }
                        onChange={setMaxTracks}
                        data={['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',
                    '16','17','18','19','20','21','22','23','24']} 
                    />
                   <Select
                        label="File Capacity"
                        value={
                            maxFiles === undefined || maxFiles === null ?
                            settingsMaxFiles : maxFiles
                        }
                        onChange={setMaxFiles}
                        data={['100','500','1000','1500','2000','2500']} 
                        mt="5px"
                    />
                   <Switch
                        labelPosition="left"
                        label="Audio File Capability"
                        checked ={  
                            audioFileCapability === undefined ||  audioFileCapability === null ? 
                            settingsAudioFileCapability : audioFileCapability
                        }
                        onChange={(event) => setAudioFileCapability(event.currentTarget.checked)}
                        mt="10px"
                    />
                    <Switch
                        labelPosition="left"
                        label="Enable Upload"
                        checked = { 
                            enableUpload === undefined || enableUpload === null ? 
                            settingsEnableUpload : enableUpload
                        }
                        onChange={(event) => setEnableUpload(event.currentTarget.checked)}
                        mt="10px"
                    />
                    <Switch
                        labelPosition="left"
                        label="Enable Delete"
                        checked = { 
                            enableDelete === undefined || enableDelete === null ? 
                            settingsEnableDelete : enableDelete
                        }
                        onChange={(event) => setEnableDelete(event.currentTarget.checked)}
                        mt="10px"
                    />
                    <Switch
                        labelPosition="left"
                        label="Enable View"
                        checked = { 
                            enableView === undefined || enableView === null ? 
                            settingsEnableView : enableView
                        }
                        onChange={(event) => setEnableView(event.currentTarget.checked)}
                        mt="10px"
                    />
                    <TextInput
                            label="Web App Title"
                            value={
                                title === undefined || title === null ? 
                                settingsTitle : title
                            } 
                            onChange={(e) => {setTitle(e.currentTarget.value)}}
                            mt="10px"
                    />
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
