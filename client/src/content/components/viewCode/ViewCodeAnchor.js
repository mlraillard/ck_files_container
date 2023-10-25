import React, { useState, useEffect } from "react";
import { Anchor, Group, Dialog, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Prism } from '@mantine/prism';

import { useStore } from '../../../store';
import { DIRECTORY_FILE } from '../../../routes';

export const ViewCodeAnchor = () => {
    const [opened, { toggle, close }] = useDisclosure(false);
    //const { height, width } = useViewportSize();
    const selectedDir = useStore(state => state.selectedDir)
    const selectedFilename = useStore(state => state.selectedFilename)
    const [dialogText, setDialogText] = useState("")


    async function run(aPromise, setResultText) {
        setResultText(await aPromise);
    }
    
    async function loadChucKCode() {
    let url = `${DIRECTORY_FILE}${selectedDir}&filename=${selectedFilename}`

    let aPromise = new Promise( async function(resolve, reject) {
        //let aChuck = await Chuck.init([], undefined, undefined, "../chuckSrc/");
        const response = await fetch(url)
        setDialogText(await response.text())
    });
    run(aPromise);
    }

    useEffect(() => {
        if (!selectedFilename) {
          try {
            close()
          }
          catch(e) {
            console.log(`e: ${e}`)
          }
        }
    }, [dialogText, close ]);

    if (opened) {
        loadChucKCode()
    }    

    return (
        <>
          { selectedFilename && selectedDir ?
            <Anchor
                component="button"
                style={{ fontSize: 'calc(10px + 0.390625vw)'}}
                onClick={() => {
                    toggle()
                }}
            >View Code
            </Anchor>
                :
            <Anchor
                component="button"
                disabled
                underline="never"
                style={{color: "gray", textDecoration:'none', fontSize: 'calc(10px + 0.390625vw)'}}
            >View Code
            </Anchor>
          }

        <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
            <Group align="flex-end">    
                <ScrollArea
                  mt="xs"
                  //w={{ base: 350, sm: 500, md: 650 }}
                  h={{ base: 350, sm: 450, md: 550 }}
                  //h={height - 40}
                  //w={width - 40}
            
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
      </Dialog>
        </>
    )
}
