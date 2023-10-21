import { useState } from 'react';
import { Container, Grid, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import mainLogo from'./chucklogo2023w.png';
//import classes from './MainHeader.module.css';
import ControlPanelComponent from '../controlPanel/ControlPanelComponent';

//import { ControlPanelComponent } from '../controlPanel/ControlPanelComponent'

export function MainHeader() {
  //const [opened, { toggle }] = useDisclosure(false);

  return (
    <header 

    style={{
      // backgroundColor: "var(--mantine-color-body)"

      //filter: "brightness(0.85)"

      // backgroundColor: "var(orange - 20)"
    }}
    //style={{backgroundColor: 'grey'}}
    //className={classes.header} 
    >
      <Container 
        size="md" 
        //className={classes.inner}
        fluid={true} >

      {/* <Grid>
        <Grid.Col rows={1} grow={true}>
          <Grid>
            <Grid.Col span={4}>
              <img  src={mainLogo} width="50" height="50" alt="fireSpot"/>
            </Grid.Col>
            <Grid.Col span={4}></Grid.Col>
            <Grid.Col span={4} offset={3}>3</Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid> */}

<Group position="apart" spacing="xl">
  <img  src={mainLogo} width="50" height="50" alt="fireSpot"/>
  <ControlPanelComponent />
</Group>
        


      </Container>
    </header>
  );
}