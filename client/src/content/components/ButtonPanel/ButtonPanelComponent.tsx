import React from 'react';
import { ScrollArea, Group } from '@mantine/core';
import { Button } from '@mantine/core';

import { ZustandJungle } from './ZustandJungle'
import {SERVER_HOST, SERVER_PORT, BUTTON_PANEL_WIDTH, BUTTON_PANEL_HEIGHT, BUTTON_PANEL_VERTICAL_MARGIN} from '../../../../clientConstants';

export const ButtonPanelComponent = () => {
  fetch(`${SERVER_HOST}\:${SERVER_PORT}\/ckFiles`)
    .then(res => res.text())
    .then((data) => {
        const bJson = JSON.parse(data)
        console.log(`data: ${JSON.stringify(bJson)}`)
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
        <ZustandJungle />
      </ScrollArea>
      </Group>
    )
  }
  

  

