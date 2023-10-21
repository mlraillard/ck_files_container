import React from "react";
//import { Footer } from "@mantine/core";


import { Container, Group, ActionIcon, rem } from '@mantine/core';
//import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
//import { MantineLogo } from '@mantine/ds';
//import ChuckLogo from '../../../../../source/chucklogo2023w.png'

import { UploadComponent } from '../../upload/UploadComponent';

import classes from './MainFooter.module.css';


function MainFooter({
    //memoizedSetFilename
  }) {
    return (
      <div className={classes.footer}>
        <Container style={{height: 60}} className={classes.inner} fluid={ true }>
          {/* <ChuckLogo size={28} /> */}
          <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
            <UploadComponent />
            {/* <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon> */}
          </Group>
        </Container>
      </div>
    );
}

export default React.memo(MainFooter)

