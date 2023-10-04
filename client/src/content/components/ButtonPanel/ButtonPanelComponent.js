import React, { useEffect, useCallback  } from 'react';
import { v4 as uuidv4 } from "uuid";
import { ScrollArea, Group, Stack, Select } from '@mantine/core';

import { useState } from "react";
import { BUTTON_PANEL_WIDTH, BUTTON_PANEL_HEIGHT } from '../../../constants'; 
import { useStore } from '../../../store';
import { PlayButton } from './PlayButton'
// import { UploadComponent } from './UploadComponent'
import { UploadComponent3 } from './UploadComponent3'

export const ButtonPanelComponent = () => {
    const asyncDirFiles = useStore(useCallback(state => state.asyncDirFiles, []))
    const loadingDirFiles = useStore(state => state.loadingDirFiles)
    const fetchDirFiles = useStore(state => state.fetchDirFiles)

    const asyncDirs = useStore(useCallback(state => state.asyncDirs, []))
    const dirsLoading = useStore(state => state.dirsLoading)
    const fetchDirs = useStore(state => state.fetchDirs)
    const [selectedDir, setSelectedDir] = useState("");

    useEffect(() => {
      fetchDirs(setSelectedDir)
    }, [fetchDirs])

    useEffect(() => {
        if (selectedDir) {
          fetchDirFiles(selectedDir)
        }
    }, [selectedDir, fetchDirFiles]);

    return (
      <Group>
        <Stack>
          <Select 
            data={asyncDirs}
            value={selectedDir}
            onChange={setSelectedDir}
          />
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
              dirsLoading ? '' :
              <Stack align="flex-start" justify="flex-start" gap="sm">
              {asyncDirFiles.map(ckFile => (
                <PlayButton 
                  key={uuidv4()}
                  desc={ckFile.desc}
                  filename={ckFile.filename}
                  dir={selectedDir}
                />
              ))}
              </Stack>
            }
          </ScrollArea>
          <UploadComponent3 dir={selectedDir} />
        </Stack>
      </Group>
    )
  }