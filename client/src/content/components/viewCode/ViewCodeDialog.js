import React, { useState, useEffect } from "react";
import { Group, Dialog, ScrollArea } from '@mantine/core';
import { Prism } from '@mantine/prism';

import { useStore } from '../../../store';
import { DIRECTORY_FILE } from '../../../routes';

function ViewCodeDialog ({
    refTarget,
    setRefTarget,
    closeRefTarget,
    mobile
}) {

  console.log(`Dialog.closeRefTarget: ${closeRefTarget}`)

  //const { height, width } = useViewportSize();
  // const [open, setOpen] = useState(mobile ? true : false) // always true at start?
  // const [open, setOpen] = useState(true)


  const [opn, setOpn] = useState(true)
  
  
  
  
  
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

  function closeDialog() {
    console.log(`closeDialog was called`)
    setOpn(false)
  }

  // useEffect(() => {
  //   if (!selectedFilename) {
  //     console.log(`UE: refTarget:${refTarget}           (| mobile:${mobile})`)
  //     try {
  //       //close()
  //       setRefTarget(false)
  //     }
  //     catch(e) {
  //       console.log(`e: ${e}`)
  //     }
  //   }
  // }, [dialogText, setRefTarget ]);

  // console.log(`D: refTarget:${refTarget} | fn:${selectedFilename}                 (| mobile:${mobile})`)

  console.log(`D: opn:${opn} | fn:${selectedFilename}                 (| mobile:${mobile})`)
  

  // if (refTarget) {loadChucKCode()} // refTarget is undefined

  if (selectedFilename) {loadChucKCode()}

  return (
        // selectedFilename && refTarget ?  //refTarget is undefined
        selectedFilename && opn ?
        <Dialog 
          // here is
          //position={{ top: 20, left: 20 }}
          
          //opened={refTarget} //refTarget is null
          opened={opn}
          
          
          
          withCloseButton
          onClose={
            //close
            //setOpn(false)
            closeDialog()
          }
          // onClose={
          // //   //close
          // //   //close
          // //   //setRefTarget(false)

          //   // setOpn(false)
          // }
          //size="lg"
          size={{xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl"}}
          radius="md">
            <Group align="flex-end">    
                <ScrollArea
                  mt="xs"
                  //w={{ base: 350, sm: 500, md: 650 }}
                  
                  //h={{ base: 350, sm: 450, md: 550 }}

                  //h={{ base: 350 }}
                  //height="250px"
                  
                  //here is
                  h={
                    // smWidth ?
                                  "85vh"
                    // :
                    // { base: 350, sm: 400, md: 450, lg: 500, xl: 550 }
                  }
                  
                  
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
      :
      ''
  )
}

export default React.memo(ViewCodeDialog)

