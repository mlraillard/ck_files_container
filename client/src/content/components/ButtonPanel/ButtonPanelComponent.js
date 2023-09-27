import React, { useEffect, useCallback  } from 'react';
import { v4 as uuidv4 } from "uuid";
import { ScrollArea, Group, Stack } from '@mantine/core';

import { BUTTON_PANEL_WIDTH, BUTTON_PANEL_HEIGHT } from '../../../constants'; 
import { useStore } from '../../../store';
import { PlayButton } from './PlayButton'

export const ButtonPanelComponent = () => {
    const asyncCkFiles = useStore(useCallback(state => state.asyncCkFiles, []))
    const loading = useStore(state => state.loading)
    const fetchCkFiles = useStore(state => state.fetchCkFiles)

    useEffect(() => {
      fetchCkFiles()
    }, [fetchCkFiles])

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
        {
          loading ? '' :
          <Stack align="flex-start" justify="flex-start" gap="sm">
           {asyncCkFiles.map(ckFile => (
            <PlayButton 
              key={uuidv4()}
              desc={ckFile.desc}
              filename={ckFile.filename}
            />
          ))}
          </Stack>
        }
      </ScrollArea>
      </Group>
    )
  }