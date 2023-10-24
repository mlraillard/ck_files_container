import { useState, useEffect, useCallback } from "react";
import { Group } from '@mantine/core';

import { useStore } from '../../../../store'

import PlayButton from './PlayButton'
import StopButton from './StopButton'

export const PlayButtonPanel = (props) => {
  const Chuck = useStore(state => state.Chuck)
  const setSelectedFilename = useStore(state => state.setSelectedFilename)
  const [aChuck, setAChuck] = useState('');
  const [stopDiabled, setStopDiabled] = useState(true);
  const [resultText, setResultText] = useState("");

  const memoizedSetFilename = useCallback(fn => {
      setSelectedFilename(fn);
  }, [setSelectedFilename]); 

  useEffect(() => {
    if (resultText && resultText.includes("PASSED")) {
      aChuck.removeLastCode();
      setStopDiabled(true)
    }
  }, [resultText, aChuck, setStopDiabled]);

  return (
    <Group noWrap={true}>
      <PlayButton
        stopDiabled = { stopDiabled}
        setStopDiabled = { setStopDiabled }
        setResultText = { setResultText }
        Chuck = { Chuck }
        setAChuck = { setAChuck }
        aChuck = { aChuck }
        filename = { props.filename }
        dir = { props.dir }
        desc = { props.desc }
        memoizedSetFilename = { memoizedSetFilename }
      />
      {
        !stopDiabled ?
          <StopButton 
            stopDiabled = { stopDiabled }
            setStopDiabled = { setStopDiabled }
            aChuck = { aChuck }
            memoizedSetFilename = { memoizedSetFilename }
          >Stop</StopButton> : ''
      }

     </Group>
  )
}