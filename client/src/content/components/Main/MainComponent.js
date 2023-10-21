import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mantine/core';

import './main.css'
import { ButtonPanelComponent } from "../buttonPanel/ButtonPanelComponent";
import { useStore } from '../../../store';
import {runChucKCode} from '../../../chuckContent/chuckRun/run.js'

export const MainComponent = () => {
  const chuckLoading = useStore(state => state.chuckLoading)
  const fetchTheChuck = useStore(state => state.fetchTheChuck)
  const Chuck = useStore(state => state.Chuck)

  const [initialized, setInitialized] = useState(false);

  function initialize() {
    runChucKCode(Chuck, '<<< "only text here" >>>;')
    setInitialized(true)
  }

  useEffect(() => {
    fetchTheChuck()
  }, [fetchTheChuck])

  return <>
    { chuckLoading ? '' :
      <Box>
        <Container fluid={ true }>
          <ButtonPanelComponent />
          <div>{
            !initialized ?
            initialize() :
            ''
          }
          </div>
        </Container>
      </Box>
    }
  </>
};
