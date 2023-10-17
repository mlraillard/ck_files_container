import React, { useEffect, useCallback  } from 'react';
import { v4 as uuidv4 } from "uuid";
import { ScrollArea, Group, Stack, Select, Grid } from '@mantine/core';

import { useState } from "react";
import { useStore } from '../../../store';
import { PlayButtonPanel } from './PlayButtonComponents/PlayButtonPanel';
import { UploadComponent } from './UploadComponent'

export const ButtonPanelComponent = () => {
    const asyncDirFiles = useStore(useCallback(state => state.asyncDirFiles, []))
    const loadingDirFiles = useStore(state => state.loadingDirFiles)
    const fetchDirFiles = useStore(state => state.fetchDirFiles)

    const asyncDirs = useStore(useCallback(state => state.asyncDirs, []))
    const dirsLoading = useStore(state => state.dirsLoading)
    const fetchDirs = useStore(state => state.fetchDirs)
    const selectedDir = useStore(state => state.selectedDir)
    const setSelectedDir = useStore(state => state.setSelectedDir)

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
            mt="md"
            data={asyncDirs}
            value={selectedDir}
            onChange={setSelectedDir}
          />
          <ScrollArea
            mt="xs"
            w={{ base: 350, sm: 600, lg: 650 }}
            h={{ base: 325 }}
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
                <PlayButtonPanel
                  key={uuidv4()}
                  desc={ckFile.desc}
                  filename={ckFile.filename}
                  dir={selectedDir}
                />
              ))}
              </Stack>
            }
          </ScrollArea>
          <Grid>
            <Grid.Col span={3}><UploadComponent dir={selectedDir} /></Grid.Col>
            {/* {
              selectedFilename ?
              <Grid.Col span={3} offset={3}><DeleteFileComponent /></Grid.Col> :
              ''
            } */}
          </Grid>
        </Stack>
      </Group>
    )
  }