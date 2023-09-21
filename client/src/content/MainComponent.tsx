import React from 'react';
import { Container, Title, ScrollArea, Box, Group } from '@mantine/core';
// import ButtonComponent from './ButtonComponent';

import '../css/styles.css';
import {BUTTON_PANEL_WIDTH, BUTTON_PANEL_HEIGHT, BUTTON_PANEL_VERTICAL_MARGIN} from './constants';
// import { myChuckScripts } from '../chuckContent/chuckRun/chuckScripts';  

const envName = process.env.name === "Test" ? ` - ${process.env.name}` : "";

export const MainComponent = () => {
  return <>
    <Container>
    <Group position="center">
      <Title order={3}>
          WebChuck example 
          {/* {process.env.NODE_ENV}{' '} */}
          {envName}
        </Title>
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
