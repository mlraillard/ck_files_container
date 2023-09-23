import React, { useState } from 'react';
import { Container, Title, ScrollArea, Box, Group } from '@mantine/core';

import './main.css'
import { ButtonPanelComponent } from "../ButtonPanel/ButtonPanelComponent";
//import {SERVER_HOST, SERVER_PORT} from '../../../../clientConstants';

const envName = process.env.name === "Test" ? ` - ${process.env.name}` : "";

export const MainComponent = () => {
  /* ckfile */
  // const [ckFile, setCkFile] = useState("");
  /* ckfile */

   /* ckfile */
  // const filename = "hoagScriptX"
  // fetch(`${SERVER_HOST}\:${SERVER_PORT}\/ckFile?filename=${filename}`)
  // .then(res => res.text())
  // .then(data => setCkFile(data))
   /* ckfile */

  return <>
    <Container>
      <Group>
        <Group position="center">
          <h1>WebChuck Snippets</h1>
          <Title order={3}>
              WebChuck example 
              {/* {process.env.NODE_ENV}{' '} */}
              {envName}
            </Title>
        </Group>
        <Group>
          <ButtonPanelComponent />
        </Group>
      </Group>
    </Container>
  </>
};
