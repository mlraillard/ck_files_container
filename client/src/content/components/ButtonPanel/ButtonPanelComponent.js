import React, { useState, useEffect, useCallback  } from 'react';
import { v4 as uuidv4 } from "uuid";
import { Alert, Modal, ScrollArea, Group, Stack, Select, Grid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Prism } from '@mantine/prism';
import structuredClone from '@ungap/structured-clone';

import { useStore } from '../../../store';
import { formatTextArrayToString } from '../../../utils';
import { PlayButtonPanel } from './PlayButtonComponents/PlayButtonPanel';

export const ButtonPanelComponent = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [result, setResult] = useState([])

    const asyncDirFiles = useStore(useCallback(state => state.asyncDirFiles, []))
    const loadingDirFiles = useStore(state => state.loadingDirFiles)
    const fetchDirFiles = useStore(state => state.fetchDirFiles)

    const asyncDirs = useStore(useCallback(state => state.asyncDirs, []))
    const dirsLoading = useStore(state => state.dirsLoading)
    const fetchDirs = useStore(state => state.fetchDirs)
    const selectedDir = useStore(state => state.selectedDir)
    const associatedDirCount = useStore(state => state.asyncDirFiles.length)
    const setSelectedDir = useStore(state => state.setSelectedDir)
    const chuckError = useStore(state => state.chuckError)
    const setChuckError = useStore(state => state.setChuckError)

    // function setResultText(text) {
    //   let rslt = structuredClone(result)
    //   rslt.push(text)
    //   setResult(rslt)
    // }

    useEffect(() => {
      fetchDirs(setSelectedDir)
    }, [fetchDirs])

    useEffect(() => {
        if (selectedDir) {
          fetchDirFiles(selectedDir)
        }
    }, [selectedDir, fetchDirFiles]);

    useEffect(() => {
      if (chuckError) { open() }
    }, [chuckError, open]);

    return (
      <Group>
        <Stack
        mt="xs"
        w={{ base: 350, sm: 500, md: 650 }}
        >
          <Select
            data={asyncDirs}
            value={selectedDir}
            onChange={setSelectedDir}
          />
          {/* <ScrollArea
            mt="xs"
            w={{ base: 350, sm: 500, md: 650 }}
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
          > */}
            {
              dirsLoading ? '' :
              <>
                <Modal
                  opened={opened}
                  onClose={
                    () => {
                      setChuckError('')
                      close()
                    }
                  }
                  title={chuckError.split('|')[0]}
                  >
                  <Alert
                    //icon={<IconAlertCircle size="1rem" />}
                    title="WebChucK Error"
                    color="red">
                      { chuckError.split('|')[1] }
                  </Alert>
                  <Prism language="markup">{ formatTextArrayToString(result) }</Prism>
                </Modal>

                <Stack align="flex-start" justify="flex-start" gap="sm">
                {asyncDirFiles.map(ckFile => (
                  <PlayButtonPanel
                    key={uuidv4()}
                    desc={ckFile.desc}
                    filename={ckFile.filename}
                    dir={selectedDir}
                    associatedDirCount={associatedDirCount}
                    setResult={setResult}
                    //setResultText={setResultText}
                  />
                ))}
                </Stack>
              </>
            }
          {/* </ScrollArea> */}
        </Stack>
      </Group>
    )
  }