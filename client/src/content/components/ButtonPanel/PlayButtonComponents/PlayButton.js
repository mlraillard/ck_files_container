import React from "react";
import { Button } from '@mantine/core';

import { loadAndRunChucKCode } from '../../../../chuckContent/chuckRun/run'
import { useStore } from '../../../../store'


function PlayButton({
    stopDiabled,
    setStopDiabled,
    setResultText,
    Chuck,
    setAChuck,
    filename,
    dir,
    desc,
    memoizedSetFilename
  }) {

    const selectedFilename = useStore(state => state.selectedFilename)
    const  bc = filename === selectedFilename ? 'orange' : ''

  return (
    <Button

      style={{
        borderColor: bc
      }}
      mt="4px"
      mb="1px"
      ml="5px"
      // variant="primary"
      color="secondary"
      size="compact-lg"
      disabled={ !stopDiabled } 
      onClick={() => {
        memoizedSetFilename(filename)
        setStopDiabled(false)
        loadAndRunChucKCode(filename, setResultText, Chuck, setAChuck, dir)
      }}
    >{ desc }
    </Button>
  );
}
export default React.memo(PlayButton)
