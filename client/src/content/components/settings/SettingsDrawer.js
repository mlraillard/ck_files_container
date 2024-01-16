import React, { useState, useEffect } from "react";
import { useFocusWithin } from '@mantine/hooks';
import { Button, Group, Drawer, Box, Select, Switch } from '@mantine/core';

import { useStore } from '../../../store';

export const SettingsDrawer = (props) => {
    const { ref, focused } = useFocusWithin();

    const settings = useStore(state => state.settings)
    const [submitDisabled, setSubmitDisabled] = useState(true)
    //const [maxTracks, setMaxTracks] = useState<string | null>(null); 
    const [maxTracks, setMaxTracks] = useState(null)
    const [maxFiles, setMaxFiles] = useState(null)
    const [audioFileCapability, setAudioFileCapability] = useState(null)


    const reset = () => {
        setMaxTracks(null)
        setMaxFiles(null)
        setAudioFileCapability(false)
        setSubmitDisabled(true)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(`going thru onSubmit...`)
    }

    useEffect(() => {
        const audio = audioFileCapability + ''
        const audioSettings = settings.audioFileCapability + ''
        if (
            maxTracks &&  (parseInt(maxTracks + '') !== parseInt(settings.maxTracks + '')) ||
            maxFiles &&  (parseInt(maxFiles + '') !== parseInt(settings.maxFiles + '')) ||
            audio != audioSettings
        ) {
            //console.log(`mt: ${maxTracks} smt: ${settings.maxTracks}`)
            setSubmitDisabled(false)
        }
        //else {
        //    console.log(`no change`)
        //}
      }, [
        settings,
        maxTracks,
        maxFiles,
        audioFileCapability,
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
                        value={settings.maxTracks + ''}
                        onChange={setMaxTracks}
                        data={['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',
                    '16','17','18','19','20','21','22','23','24']} 
                    />
                   <Select
                        label="File Capacity"
                        value={settings.maxFiles + ''}
                        onChange={setMaxFiles}
                        data={['100','500','1000','1500','2000','2500']} 
                        mt="5px"
                    />
                   <Switch
                        labelPosition="left"
                        label="Audio File Capability"
                        value={  (settings.audioFileCapability + '').toLowerCase() === "true"}
                        onChange={setAudioFileCapability}
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
