import { useState, useEffect, useCallback } from "react";
import { Group } from '@mantine/core';

import { useStore } from '../../../../store'

import PlayButton from './PlayButton'
import StopButton from './StopButton'

export const PlayButtonPanel = (props) => {
  const Chuck = useStore(state => state.Chuck)
  const setAChuck = useStore(state => state.setAChuck)
  const shredId = useStore(state => state.shredId)
  const setShredId = useStore(state => state.setShredId)
  const selectedFilename = useStore(state => state.selectedFilename)
  const setSelectedFilename = useStore(state => state.setSelectedFilename)
  const [stopDiabled, setStopDiabled] = useState(true);
  const [resultText, setResultText] = useState("");

  const memoizedSetFilename = useCallback(fn => {
      setSelectedFilename(fn);
  }, [setSelectedFilename]); 

  // useEffect(() => {
  //   if (resultText && resultText.includes("PASSED")) {
  //     aChuck.removeLastCode();
  //     setShredId(0)
  //     setStopDiabled(true)
  //   }
  // }, [resultText, aChuck, setStopDiabled]);

  return (
    <Group noWrap={true}>
      <PlayButton
        stopDiabled = { stopDiabled}
        setStopDiabled = { setStopDiabled }
        setResultText = { setResultText }
        Chuck = { Chuck }
        setAChuck = { setAChuck }
        filename = { props.filename }
        dir = { props.dir }
        desc = { props.desc }
        memoizedSetFilename = { memoizedSetFilename }
      />
      {
        //!stopDiabled ?
        props.filename === selectedFilename && shredId > 0 ?
          <StopButton 
            stopDiabled = { stopDiabled }
            setStopDiabled = { setStopDiabled }
            memoizedSetFilename = { memoizedSetFilename }
          >Stop</StopButton> : ''
      }
     </Group>
  )
}