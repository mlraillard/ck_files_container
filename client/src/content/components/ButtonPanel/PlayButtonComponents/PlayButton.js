import React from "react";
import { Button } from '@mantine/core';

import { loadAndRunChucKCode } from '../../../../chuckContent/chuckRun/run'
import { useStore } from '../../../../store'

function PlayButton({
    setResultText,
    Chuck,
    filename,
    dir,
    desc,
    memoizedSetFilename,
    activeDirFilenames
  }) {

    const selectedFilename = useStore(state => state.selectedFilename)
    const setActiveDirFilenames = useStore(state => state.setActiveDirFilenames)
    const qPush = useStore(state => state.qPush)
  
  return (
    <Button
      style={{
        borderColor: activeDirFilenames.includes(`${dir} ${filename}`) ? 'orange' : ''
      }}
      mt="4px"
      mb="1px"
      ml="5px"
      // variant="primary"
      color="secondary"
      size="compact-lg"
      disabled={ activeDirFilenames.includes(`${dir} ${filename}`) }
      onClick={() => {
        memoizedSetFilename(filename)
        loadAndRunChucKCode(
          filename,
          setResultText,
          Chuck,
          dir,
          qPush,
          setActiveDirFilenames
          )
      }}
    >{ desc }
    </Button>
  );
}
export default React.memo(PlayButton)
