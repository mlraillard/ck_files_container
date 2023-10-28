import React from "react";
import { useDisclosure } from '@mantine/hooks';
import { Anchor } from '@mantine/core';

import { UploadDrawer } from "./UploadDrawer";

function UploadAnchor() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
    <UploadDrawer 
        opened={opened}
        open={open}
        close={close}
    />
    <Anchor
        component="button"
        style={{ fontSize: 'calc(10px + 0.390625vw)'}}
        onClick={open}>Upload</Anchor>
    </>
  )
}
export default UploadAnchor
