import React, { useEffect } from 'react';
import { Container, Title, Group } from '@mantine/core';

import './main.css'
import { ButtonPanelComponent_forSingleDir } from "../ButtonPanel/ButtonPanelComponent_forSingleDir";
import { useStore } from '../../../store';
import {runChucKCode} from '../../../chuckContent/chuckRun/run.js'

const envName = process.env.name === "Test" ? ` - ${process.env.name}` : "";

export const MainComponent = () => {
  const chuckLoading = useStore(state => state.chuckLoading)
  const fetchTheChuck = useStore(state => state.fetchTheChuck)
  const Chuck = useStore(state => state.Chuck)

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
            <ButtonPanelComponent_forSingleDir />
          </Group>
        </Group>
        <div>{ runChucKCode(Chuck, '<<< "only text here" >>>;')}</div>
      </Container>
    }
  </>
};
