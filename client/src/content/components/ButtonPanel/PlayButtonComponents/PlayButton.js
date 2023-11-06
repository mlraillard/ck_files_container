import React from "react";
import { Button } from '@mantine/core';

import { loadAndRunChucKCode } from '../../../../chuckContent/chuckRun/run'
import { useStore } from '../../../../store'

function PlayButton({
    setResultText,
    Chuck,
    setAChuck,
    filename,
    dir,
    desc,
    memoizedSetFilename,
    activeDirFilenames
  }) {

    const selectedFilename = useStore(state => state.selectedFilename)
    const shredId = useStore(state => state.shredId)
    const setShredId = useStore(state => state.setShredId)
    const setActiveDirFilenames = useStore(state => state.setActiveDirFilenames)
    const addActiveDirFilename = useStore(state => state.addActiveDirFilename)
    //const activeDirFilenames = useStore(state => state.activeDirFilenames)

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
          setAChuck,
          dir,
          setShredId,
          qPush,
          setActiveDirFilenames
          //addActiveDirFilename
          )
          // setTimeout(() => {
          //   setActiveDirFilenames()
          //   // addActiveDirFilename(`${dir} ${filename}`)
          //   console.log(`p.active: ${JSON.stringify(activeDirFilenames)}`)
          // }, 200);
      }}
    >{ desc }
    </Button>
  );
}
export default React.memo(PlayButton)

/*
disabled={ !stopDisabled || (selectedFilename && filename != selectedFilename) }
*/