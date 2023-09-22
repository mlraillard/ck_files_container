import React, { useState } from 'react';
import { Container, Title, ScrollArea, Box, Group } from '@mantine/core';
// import ButtonComponent from './ButtonComponent';

import './main.css'
import {BUTTON_PANEL_WIDTH, BUTTON_PANEL_HEIGHT, BUTTON_PANEL_VERTICAL_MARGIN} from '../../constants';

const envName = process.env.name === "Test" ? ` - ${process.env.name}` : "";

export const MainComponent = () => {
  const [ckFiles, setCkFiles] = useState("");

  /*
  Read about how to use the package.json proxy instead of hardcoding the URL:
  https://create-react-app.dev/docs/proxying-api-requests-in-development/#:~:text=Configuring%20the%20Proxy%20Manually%E2%80%8B&text=You%20can%20use%20this%20feature,into%20src/setupProxy.js%20.&text=Note:%20You%20do%20not%20need,you%20start%20the%20development%20server.


  https://www.google.com/search?q=how+to+use+proxy+in+package.json&oq=how+to+use+proxy+in+package.json&aqs=chrome..69i57j0i22i30l2j0i390i650l3.9517j0j7&sourceid=chrome&ie=UTF-8
  */

  fetch('http://localhost:8002/ckFiles')
  .then(res => res.text())
  .then(data => setCkFiles(data))
  
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
       { ckFiles }
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
