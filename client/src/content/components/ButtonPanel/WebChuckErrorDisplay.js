import React, { useState, useEffect } from 'react';
import { Alert, Modal, Button, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Prism } from '@mantine/prism';

import { useStore } from '../../../store';
import { DIRECTORY_FILE } from '../../../routes';
import { formatTextArrayToString } from '../../../utils';

export const WebChuckErrorDisplay = (props) => {
    const [opened, { open, close }] = useDisclosure(false);
    const chuckError = useStore(state => state.chuckError)
    const setChuckError = useStore(state => state.setChuckError)
    
    const errorFilename = useStore(state => state.errorFilename)
    const errorDir = useStore(state => state.errorDir)
    
    const [dialogText, setDialogText] = useState("")
    const [visible, setVisible] = useState(false);
    
    async function run(aPromise) { await aPromise }

    async function loadChucKCode() {
        if (errorFilename) {
          let url = `${DIRECTORY_FILE}${errorDir}&filename=${errorFilename}`
  
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

      useEffect(() => {
        if (chuckError) {
            (async () => {
                try {
                  await loadChucKCode()
                  open()
                } catch (err) {
                  console.error(err);
                }
              })();
        }
      }, [chuckError, open]); 

    return (
        <Modal
            opened={ opened }
            onClose={() => {
                setChuckError('')
                close()
            }}
            title={chuckError.split('|')[0]}
            >
              { !visible ? 
              <>
                <Alert
                    //icon={<IconAlertCircle size="1rem" />}
                    title="WebChucK Error"
                    color="red">
                        { chuckError.split('|')[1] }
                </Alert>
                <Prism language="markup" noCopy={true}>
                    { formatTextArrayToString(props.result) }
                </Prism>
              </> : 
              <ScrollArea
                type="always"
              >
                <Prism language="c">{dialogText}</Prism>
              </ScrollArea>
              }
            <Button 
              onClick={() => setVisible((v) => !v)}
              fullWidth 
              maw={200}
              mx="auto"
              mt="xl">Toggle source code
            </Button>
        </Modal>
    )
}