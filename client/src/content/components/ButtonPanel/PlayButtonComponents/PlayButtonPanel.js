import { useState, useEffect, useCallback } from "react";
import { Group } from '@mantine/core';

import { useStore } from '../../../../store'

import PlayButton from './PlayButton'
import StopButton2 from './StopButton2'
import DelayedComponent from "./DelayedComponent";

export const PlayButtonPanel = (props) => {
  const Chuck = useStore(state => state.Chuck)
  const setAChuck = useStore(state => state.setAChuck)
  const shredId = useStore(state => state.shredId)
  const selected = useStore(state => state.selected)

  const setShredId = useStore(state => state.setShredId)
  const selectedFilename = useStore(state => state.selectedFilename)
  const setSelectedFilename = useStore(state => state.setSelectedFilename)
  const activeDirFilenames = useStore(state => state.activeDirFilenames)

  const [resultText, setResultText] = useState("");

  const memoizedSetFilename = useCallback(fn => {
      setSelectedFilename(fn);
  }, [setSelectedFilename]); 

  // useEffect(() => {
  //   if (resultText && resultText.includes("PASSED")) {
  //     aChuck.removeLastCode();
  //     setShredId(0)
  //     setStopDisabled(true)
  //   }
  // }, [resultText, aChuck, setStopDisabled]);

  //console.log(`b active: ${JSON.stringify(activeDirFilenames)}`)

  return (
    <Group noWrap={true}>
      <PlayButton
        setResultText = { setResultText }
        Chuck = { Chuck }
        setAChuck = { setAChuck }
        filename = { props.filename }
        dir = { props.dir }
        desc = { props.desc }
        memoizedSetFilename = { memoizedSetFilename }
        activeDirFilenames = { activeDirFilenames }
      />
      {
        activeDirFilenames.includes(`${props.dir} ${props.filename}`) ?
          <StopButton2
            filename = { props.filename }
            dir = { props.dir }
            activeDirFilenames = { activeDirFilenames }
          >Stop</StopButton2> 
          : ''

          // <DelayedComponent
          //   filename = { props.filename }
          //   dir = { props.dir }
          // />
      }
     </Group>
  )
}