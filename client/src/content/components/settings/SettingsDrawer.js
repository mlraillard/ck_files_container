import React from "react";
import { useFocusWithin } from '@mantine/hooks';
import { Drawer, Box } from '@mantine/core';

export const SettingsDrawer = (props) => {
    const { ref, focused } = useFocusWithin();

    return (
        <>
        <Drawer
            opened={props.opened}
            onClose={() => {
                props.close()
                //reset()
            }}
            title="Customize the WebChucK Player"
        >
            <Box maw={340} mx="auto">
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
