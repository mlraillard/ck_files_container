import React, { useState } from 'react';
import { Container, Title, ScrollArea, Box, Group } from '@mantine/core';
// import { getButtons } from "./utils"
// import ButtonComponent from './ButtonComponent';
import PlayButtonComponent from './PlayButtonComponent';

import {SERVER_HOST, SERVER_PORT, BUTTON_PANEL_WIDTH, BUTTON_PANEL_HEIGHT, BUTTON_PANEL_VERTICAL_MARGIN} from '../../../../clientConstants';

export const ButtonPanelComponent = () => {
  // const [ckFiles, setCkFiles] = useState("");
  const [buttons, setButtons] = useState(<></>)

  fetch(`${SERVER_HOST}\:${SERVER_PORT}\/ckFiles`)
    .then(res => res.text())
    .then((data) => {
        // console.log(`data: ${data}`)
        //setCkFiles(data)
        // getButtons(data) 
        // setButtons(getButtons(data))

        const bJson = JSON.parse(data)
        let jsx = ""
      
        // bJson.forEach(b => {
        //   // Print the name and age of each object
        //   console.log(`Name: ${b.desc}, Age: ${b.filename}`);
        //   jsx += <PlayButtonComponent desc={b.desc} filename={b.filename}/>
        // });

        // setButtons(<Group>{jsx}</Group>)


    })

    return (
      <Group>
        <ScrollArea
        w={ BUTTON_PANEL_WIDTH }
        h={ BUTTON_PANEL_HEIGHT }
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
        <Box w={ BUTTON_PANEL_WIDTH - BUTTON_PANEL_VERTICAL_MARGIN }>
          {/* <ButtonComponent test={myChuckScripts[1]} /> */}
          {/* { buttons } */}
        </Box>
      </ScrollArea>
      </Group>
      
    )
  }
  

  

