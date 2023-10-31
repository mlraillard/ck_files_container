import React from "react";
import { Anchor } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useStore } from '../../../store';
import { DeleteDrawer } from "./DeleteDrawer";

function DeleteAnchor() {
    const [opened, { open, close }] = useDisclosure(false)
    const selectedDir = useStore(state => state.selectedDir)
    const selectedFilename = useStore(state => state.selectedFilename)

    return (
        <>
          <DeleteDrawer
              opened={opened}
              open={open}
              close={close}
          />
          { selectedFilename && selectedDir ?
          <Anchor
            component="button"
            style={{ fontSize: 'calc(10px + 0.390625vw)'}}
            onClick={open}>Delete
          </Anchor>
            :
          <Anchor
            component="button"
            disabled
            underline="never"
            style={{color: "gray", textDecoration:'none', fontSize: 'calc(10px + 0.390625vw)'}}
          >Delete
          </Anchor>
          }
        </>
    )
}

export default React.memo(DeleteAnchor)

