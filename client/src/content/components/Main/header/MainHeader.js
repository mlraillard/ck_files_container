import { Container, Group, Burger } from '@mantine/core';
import mainLogo from'./chucklogo2023w.png';
import ControlPanelComponent from '../controlPanel/ControlPanelComponent';

export function MainHeader() {
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
                color: "rgb(250, 200, 152)",
                fontSize: 'calc(12px + 0.390625vw)'
              }}
            >
              WebChucK Player
            </h2>
              </div>
          </div>
          <ControlPanelComponent />
        </Group>
      </Container>
    </header>
  );
}