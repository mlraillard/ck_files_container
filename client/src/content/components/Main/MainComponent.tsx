import React, { useState } from 'react';
import { Container, Title, ScrollArea, Box, Group } from '@mantine/core';
// import ButtonComponent from './ButtonComponent';

import './main.css'
import {SERVER_HOST, SERVER_PORT, BUTTON_PANEL_WIDTH, BUTTON_PANEL_HEIGHT, BUTTON_PANEL_VERTICAL_MARGIN} from '../../../../clientConstants';

const envName = process.env.name === "Test" ? ` - ${process.env.name}` : "";

export const MainComponent = () => {
  /****** ckFiles ******/
  // const [ckFiles, setCkFiles] = useState("");
  /****** ckFiles ******/

  const [ckFile, setCkFile] = useState("");

  /****** ckFiles ******/
  // fetch(`${SERVER_HOST}\:${SERVER_PORT}\/ckFiles`)
  // .then(res => res.text())
  // .then(data => setCkFiles(data))
  /****** ckFiles ******/

  const filename = "hoagScriptX"
  fetch(`${SERVER_HOST}\:${SERVER_PORT}\/ckFile?filename=${filename}`)
  .then(res => res.text())
  .then(data => setCkFile(data))

  return <>
    <Container>
    <Group position="center">
      <h1>WebChuck Snippets</h1>
      <Title order={3}>
          WebChuck example 
          {/* {process.env.NODE_ENV}{' '} */}
          {envName}
        </Title>
    </Group>
    <Group>
       { 
        /****** ckFiles ******/
        // ckFiles 
        /****** ckFiles ******/

        ckFile
       }
    </Group>

    {/* <Group position="center">
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
          <ButtonComponent test={myChuckScripts[1]} />
        </Box>
      </ScrollArea>
    </Group> */}
    </Container>
  </>
};
