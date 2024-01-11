import React, { useState, useEffect } from "react";
import { useFocusWithin } from '@mantine/hooks';
import { Button, Group, Drawer, Box, Select } from '@mantine/core';

import { useStore } from '../../../store';

export const SettingsDrawer = (props) => {
    const { ref, focused } = useFocusWithin();

    const settings = useStore(state => state.settings)
    const [submitDisabled, setSubmitDisabled] = useState(true)
    //const [maxTracks, setMaxTracks] = useState<string | null>(null); 
    const [maxTracks, setMaxTracks] = useState(null)

    const reset = () => {
        setMaxTracks(null)
        setSubmitDisabled(true)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(`going thru onSubmit...`)
    }

    useEffect(() => {
        if (maxTracks &&  (parseInt(maxTracks + '') !== parseInt(settings.maxTracks + '')) ) {
            //console.log(`mt: ${maxTracks} smt: ${settings.maxTracks}`)
            setSubmitDisabled(false)
        }
        //else {
        //    console.log(`no change`)
        //}
      }, [
        settings,
        maxTracks,
        setSubmitDisabled
    ]);

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
                        data={['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']} 
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
