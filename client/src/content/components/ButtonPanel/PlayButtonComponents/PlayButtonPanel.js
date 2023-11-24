import { useState, useEffect, useCallback } from "react";
import { Group } from '@mantine/core';

import { useStore } from '../../../../store'

import PlayButton from './PlayButton'
import StopButton from './StopButton'

export const PlayButtonPanel = (props) => {
  const Chuck = useStore(state => state.Chuck)
  const activeDirFilenames = useStore(state => state.activeDirFilenames)

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
        Chuck = { Chuck }
        filename = { props.filename }
        dir = { props.dir }
        associatedDirCount = { props.associatedDirCount }
        desc = { props.desc }
        activeDirFilenames = { activeDirFilenames }
        setResult = { props.setResult }
        // setResultText = { props.setResultText }
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