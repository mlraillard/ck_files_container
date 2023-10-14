import React, { useState, useEffect } from 'react';
import { Container, Title, Group, Dialog, Button, TextInput, Text  } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import './main.css'
import { ButtonPanelComponent } from "../ButtonPanel/ButtonPanelComponent";
import { ButtonPanelComponent_forSingleDir } from "../ButtonPanel/ButtonPanelComponent_forSingleDir";
import { useStore } from '../../../store';
import {runChucKCode} from '../../../chuckContent/chuckRun/run.js'
import { SINGLE_DIRECTORY_MODE } from '../../../constants'
import { DIRECTORY_FILE } from '../../../routes';
const envName = process.env.name === "Test" ? ` - ${process.env.name}` : "";

export const MainComponent = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const chuckLoading = useStore(state => state.chuckLoading)
  const fetchTheChuck = useStore(state => state.fetchTheChuck)
  const Chuck = useStore(state => state.Chuck)

  const [initialized, setInitialized] = useState(false);
  const [dialogText, setDialogText] = useState("");

  function initialize() {
    runChucKCode(Chuck, '<<< "only text here" >>>;')
    setInitialized(true)
  }

  async function run(aPromise, setResultText) {
    setResultText(await aPromise);
  }

  async function loadChucKCode() {
    const dir = 'ccrma'
    const filename = 'test2.ck'
    let url = `${DIRECTORY_FILE}${dir}&filename=${filename}`

    let aPromise = new Promise( async function(resolve, reject) {
        //let aChuck = await Chuck.init([], undefined, undefined, "../chuckSrc/");
        const response = await fetch(url)
        setDialogText(await response.text())

    });
    run(aPromise);
  }

  if (opened) {
    loadChucKCode()
  }


  useEffect(() => {
    fetchTheChuck()
  }, [fetchTheChuck])

  return <>
    { chuckLoading ? 'webchuck is loading...' :
      <Container>
        <Group>
          <Group position="center">
            <h1>WebChuck Snippets</h1>
            <Title order={3}>
                for learning 
                {/* {process.env.NODE_ENV}{' '} */}
                {envName}
              </Title>
          </Group>
          <Group>
            {
              SINGLE_DIRECTORY_MODE ?
              <ButtonPanelComponent_forSingleDir /> : <ButtonPanelComponent />
            }
          </Group>
        </Group>
        <Button onClick={
          toggle
        }>Show Code</Button>
        <div>{
          !initialized ?
          initialize() :
          'ran'
        }
        </div>
        <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
        <Text size="sm" mb="xs" fw={500}>
          Subscribe to email newsletter
        </Text>

        <Group align="flex-end">
          {/* <TextInput placeholder="hello@gluesticker.com" style={{ flex: 1 }} />
          <Button onClick={close}>Subscribe</Button> */}

          { dialogText }
        </Group>
      </Dialog>


      </Container>
    }
  </>
};
