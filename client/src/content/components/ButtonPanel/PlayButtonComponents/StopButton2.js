import React, { useState, useCallback } from "react";
import { Button } from '@mantine/core';

import { useStore } from '../../../../store'

function StopButton2({
    filename,
    dir
  }) {

    const trackByDirAndFilename = useStore(state => state.trackByDirAndFilename) 
    const removeByDirAndFilename = useStore(state => state.removeByDirAndFilename)
    const activeDirFilenames = useStore(state => state.activeDirFilenames)
    const getActiveDirFilenames = useStore(state => state.getActiveDirFilenames)
    const setActiveDirFilenames = useStore(state => state.setActiveDirFilenames)
    const removeActiveDirFilename = useStore(state => state.removeActiveDirFilename)
 
    // const [track, setTrack] = useState(null);
    // const [initialized, setInitialized] = useState(false);
    const [renderComponent, setRenderComponent] = useState(false);

    // if (!initialized) {
    //     setTimeout(() => {
    //         const t = trackByDirAndFilename(dir, filename)
    //         setTrack(t)
    //         console.log(`track: ${track}`)
    //         setInitialized(true)
    //       }, 500);
    // }

    console.log(`s.${dir} ${filename}: ${JSON.stringify(activeDirFilenames)}`)

  return (
    <>
    {
      // track ?
      activeDirFilenames.includes(`${dir} ${filename}`) ?
      // getActiveDirFilenames().includes(`${dir} ${filename}`) ?

      <Button
          mt="4px"
          mb="1px"
          ml="5px"
          size="compact-lg"
          style={{color: 'orange'}}
          disabled={ !activeDirFilenames.includes(`${dir} ${filename}`) }
          variant="danger"
          onClick={() => {
            removeByDirAndFilename(dir, filename)
            setTimeout(() => {
              setActiveDirFilenames()
              // removeActiveDirFilename(`${dir} ${filename}`)
            }, 200);
          }}
          >
          Stop
      </Button>
      : 'yoyo'
    }
  </>
  );
}
export default React.memo(StopButton2)
