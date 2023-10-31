import React, { useState } from "react";

import { useFocusWithin } from '@mantine/hooks';
import { Drawer, Box, Group, Dialog, ScrollArea } from '@mantine/core';
import { Prism } from '@mantine/prism';

import { useStore } from '../../../store';
import { DIRECTORY_FILE } from '../../../routes';

export const ViewCodeDrawer = (props) => {

    const selectedDir = useStore(state => state.selectedDir)
    const selectedFilename = useStore(state => state.selectedFilename)
    const [dialogText, setDialogText] = useState("")

    async function run(aPromise, setResultText) {
        setResultText(await aPromise);
    }

    async function loadChucKCode() {
        if (selectedFilename) {
          let url = `${DIRECTORY_FILE}${selectedDir}&filename=${selectedFilename}`
    
          let aPromise = new Promise( async function(resolve, reject) {
              //let aChuck = await Chuck.init([], undefined, undefined, "../chuckSrc/");
              const response = await fetch(url)
              setDialogText(await response.text())
          });
          run(aPromise);
        }
        else {
          Promise.resolve('')
        }
    }

    if (selectedFilename) {loadChucKCode()}

    return (
        <>
        <Drawer
            opened={props.opened}
            onClose={() => {
                props.close()
                //reset()
            }}
        >
            <Box maw={340} mx="auto">
            <Group align="flex-end">    
                <ScrollArea
                  mt="xs"
                  h="500px"
                  style={{ 
                    //width: "350px",
                    maxWidth: "350px"
                   }}
                  type="always"
                  offsetScrollbars
                  styles={(theme) => ({
                    scrollbar: {
                      '&, &:hover': {
                        background:
                          theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                      },

                      '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
                        backgroundColor: theme.colors.red[6],
                      },

                      '&[data-orientation="horizontal"] .mantine-ScrollArea-thumb': {
                        backgroundColor: theme.colors.blue[6],
                      },
                    },

                    corner: {
                      opacity: 1,
                      background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    },
                  })}
                >
                <Prism language="c">{dialogText}</Prism>
            </ScrollArea>
            </Group>
            </Box>
        </Drawer>
        </>
    )
}