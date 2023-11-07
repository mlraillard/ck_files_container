import { useState, useEffect, useCallback } from "react";
import { Group } from '@mantine/core';

import { useStore } from '../../../../store'

import PlayButton from './PlayButton'
import StopButton from './StopButton'
import DelayedComponent from "./DelayedComponent";

export const PlayButtonPanel = (props) => {
  const Chuck = useStore(state => state.Chuck)
  const setAChuck = useStore(state => state.setAChuck)
  const activeDirFilenames = useStore(state => state.activeDirFilenames)
  const [resultText, setResultText] = useState("");

  //..to stop and remove scripts that finish w/o closing
  //..decided - not so good
  // useEffect(() => {
  //   if (resultText && resultText.includes("PASSED")) {
  //     .....
  //   }
  // }, [resultText]);

  return (
    <Group noWrap={true}>
      <PlayButton
        setResultText = { setResultText }
        Chuck = { Chuck }
        setAChuck = { setAChuck }
        filename = { props.filename }
        dir = { props.dir }
        desc = { props.desc }
        activeDirFilenames = { activeDirFilenames }
      />
      {
        activeDirFilenames.includes(`${props.dir} ${props.filename}`) ?
          <StopButton
            filename = { props.filename }
            dir = { props.dir }
            activeDirFilenames = { activeDirFilenames }
          >Stop</StopButton> 
          : ''
      }
     </Group>
  )
}