import React, { useEffect } from 'react';
import { Container, Title, Group } from '@mantine/core';

import './main.css'
import { ButtonPanelComponent } from "../ButtonPanel/ButtonPanelComponent";
import { useStore } from '../../../store';

const envName = process.env.name === "Test" ? ` - ${process.env.name}` : "";

export const MainComponent = () => {
  const chuckLoading = useStore(state => state.chuckLoading)
  const fetchTheChuck = useStore(state => state.fetchTheChuck)

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
            <ButtonPanelComponent />
          </Group>
        </Group>
      </Container>
    }
  </>
};
