import React, { useEffect, useCallback  } from 'react';
import { ScrollArea, Group } from '@mantine/core';

import { SERVER_HOST, SERVER_PORT, BUTTON_PANEL_WIDTH, BUTTON_PANEL_HEIGHT } from '../../../constants'; 
import { useStore } from '../../../store';
import { PlayButton } from './PlayButton'

export const ButtonPanelComponent = () => {
    const asyncTodos = useStore(useCallback(state => state.asyncTodos, []))
    const loading = useStore(state => state.loading)
    const fetchTodos = useStore(state => state.fetchTodos)

    useEffect(() => {
      fetchTodos()
    }, [fetchTodos])

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
        {/* <ZustandJungle /> */}
        {/* { <PlayButton />} */}
        {
          loading ? '' :

          <ul>
          {asyncTodos.map(todo => (
            <li key={todo.id}>
              {todo.title}
            </li>
          ))}
        </ul>


        }
      </ScrollArea>
      </Group>
    )
  }
  

  

