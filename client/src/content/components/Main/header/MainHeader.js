import { Container, Group, Burger } from '@mantine/core';
import mainLogo from'./chucklogo2023w.png';
import ControlPanelComponent from '../controlPanel/ControlPanelComponent';

import { useStore } from '../../../../store';

export function MainHeader() {
  const settings = useStore(state => state.settings)
  const titleColor = settings.darkTheme === "true" ? "rgb(250, 200, 152)" : "orange"

  return (
    <header>
      <Container 
        size="md" 
        fluid={true} >
        <Group position="apart" spacing="xl">
          <div style={{paddingTop: "10px"}}>
              <div style={{display: "inline-block"}}>
                <img  src={mainLogo} width="50" height="50" alt="fireSpot" />
              </div>
              <div style={{display: "inline-block"}}>
            <h2
              style={{
                color: `${titleColor}`,
                fontSize: 'calc(12px + 0.390625vw)'
              }}
            >
              { settings.title }
            </h2>
              </div>
          </div>
          <ControlPanelComponent />
        </Group>
      </Container>
    </header>
  );
}