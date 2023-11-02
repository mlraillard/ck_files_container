import React, { useState } from "react";
import { Button } from '@mantine/core';

import { useStore } from '../../../../store'

function StopButton({
    stopDiabled,
    setStopDiabled,
    memoizedSetFilename
  }) {
  const aChuck = useStore(state => state.aChuck)
  const shredId = useStore(state => state.shredId)
  const setShredId = useStore(state => state.setShredId)

  return (
    <Button
        mt="4px"
        mb="1px"
        ml="5px"
        size="compact-lg"
        style={{color: 'orange'}}
        //disabled={stopDiabled}
        disabled={ shredId === 0 }
        variant="danger"
        onClick={() => {
          aChuck.removeLastCode();
          setShredId(0)
          setStopDiabled(true)
          memoizedSetFilename('')
        }}
        >
        Stop
    </Button>
  );
}
export default React.memo(StopButton)
