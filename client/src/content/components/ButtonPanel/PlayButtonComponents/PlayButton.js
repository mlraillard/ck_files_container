import React from "react";
import { Button } from '@mantine/core';

import { loadAndRunChucKCode } from '../../../../chuckContent/chuckRun/run'
import { useStore } from '../../../../store'

function PlayButton({
    Chuck,
    filename,
    dir,
    associatedDirCount,
    desc,
    activeDirFilenames,
    setResult
  }) {
    const setActiveDirFilenames = useStore(state => state.setActiveDirFilenames)
    const setSelectedFilename = useStore(state => state.setSelectedFilename)
    const setChuckError = useStore(state => state.setChuckError)
    const setErrorFilename = useStore(state => state.setErrorFilename)
    const setErrorDir = useStore(state => state.setErrorDir)
    const qPush = useStore(state => state.qPush)
    const settings = useStore(state => state.settings)

  const actv = activeDirFilenames.includes(`${dir} ${filename}`)
  const mxd = activeDirFilenames.length >= settings.maxTracks
  return (
    <Button
      style={{
        borderColor: actv ? 'orange' : ( mxd ? "rgb(25, 113, 194)" : '')
      }}
      mt="4px"
      mb="1px"
      ml="5px"
      // variant="primary"
      color="secondary"
      size="compact-lg"
      disabled={ actv || mxd }
      onClick={() => {
        loadAndRunChucKCode(
          filename,
          Chuck,
          dir,
          qPush,
          setActiveDirFilenames,
          setSelectedFilename,
          associatedDirCount,
          setChuckError,
          setResult,
          setErrorFilename,
          setErrorDir
          )
      }}
    >{ desc }
    </Button>
  );
}
export default React.memo(PlayButton)
