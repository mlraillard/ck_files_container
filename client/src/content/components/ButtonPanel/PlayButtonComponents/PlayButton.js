import React from "react";
import { Button } from '@mantine/core';

import { loadAndRunChucKCode } from '../../../../chuckContent/chuckRun/run'
import { useStore } from '../../../../store'

function PlayButton({
    setResultText,
    Chuck,
    filename,
    dir,
    associatedDirCount,
    desc,
    activeDirFilenames
  }) {
    const setActiveDirFilenames = useStore(state => state.setActiveDirFilenames)
    const setSelectedFilename = useStore(state => state.setSelectedFilename)
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
        loadAndRunChucKCode(
          filename,
          setResultText,
          Chuck,
          dir,
          qPush,
          setActiveDirFilenames,
          setSelectedFilename,
          associatedDirCount
          )
      }}
    >{ desc }
    </Button>
  );
}
export default React.memo(PlayButton)
