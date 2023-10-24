import React from "react";
import { Button } from '@mantine/core';

function StopButton({
    stopDiabled,
    setStopDiabled,
    aChuck,
    memoizedSetFilename
  }) {

  return (
    <Button
        mt="4px"
        mb="1px"
        ml="5px"
        size="compact-lg"
        style={{color: 'orange'}}
        disabled={stopDiabled}
        variant="danger"
        onClick={() => {
          aChuck.removeLastCode();
          setStopDiabled(true)
          memoizedSetFilename('')
        }}
        >
        Stop
    </Button>
  );
}
export default React.memo(StopButton)
