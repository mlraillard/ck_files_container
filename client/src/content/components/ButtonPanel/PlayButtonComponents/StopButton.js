import React from "react";
import { Button } from '@mantine/core';
import structuredClone from '@ungap/structured-clone';

import { useStore } from '../../../../store'

function StopButton({
    filename,
    dir,
    activeDirFilenames
  }) {
    const removeByDirAndFilename = useStore(state => state.removeByDirAndFilename)
    const resetActiveDirFilenames = useStore(state => state.resetActiveDirFilenames)

    return (
      <Button
          mt="4px"
          mb="1px"
          ml="5px"
          size="compact-lg"
          style={{color: 'orange'}}
          disabled={ !activeDirFilenames.includes(`${dir} ${filename}`) }
          variant="danger"
          onClick={() => {
            const cArray = structuredClone(activeDirFilenames)
            const cDir = dir.slice()
            const cFilename = filename.slice() 
            removeByDirAndFilename(dir, filename)
            setTimeout(() => {
              resetActiveDirFilenames(cArray, cDir, cFilename)
            }, 200);
          }}
          >
          Stop
      </Button>
  );
}
export default React.memo(StopButton)
