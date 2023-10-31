import React from "react";
import { useFocusWithin } from '@mantine/hooks';
import { Drawer, Box, Text } from '@mantine/core';

import { useStore } from '../../../store';

export const DeleteDrawer = (props) => {
    const { ref, focused } = useFocusWithin();
    const selectedDir = useStore(state => state.selectedDir)
    const selectedFilename = useStore(state => state.selectedFilename)

    return (
        <>
        <Drawer
            opened={props.opened}
            onClose={() => {
                props.close()
                //reset()
            }}
            title="Delete Selected WebChucK File"
        >
            <Box maw={340} mx="auto">
            <Text c="rgb(250, 200, 152)" fs="italic" size="md">{`${selectedDir} \\ ${selectedFilename}`}</Text>
                {/* <form onSubmit={onSubmit}>
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
                </form> */}
            </Box>
        </Drawer>
        </>
    )
}