import { useState, useEffect } from "react";
import { Group, Button, Text } from '@mantine/core';

import { useStore } from '../../../store'
import { loadAndRunChucKCode } from "../../../chuckContent/chuckRun/run.js";

export const PlayButton = (props) => {
  const Chuck = useStore(state => state.Chuck)
  const [aChuck, setAChuck] = useState(null);
  const [stopDiabled, setStopDiabled] = useState(true);
  const [resultText, setResultText] = useState("");
  // const resultTextfield = <Text fz="md">{ resultText }</Text>;


  useEffect(() => {
    //&& resultText.trim === "PASSED"
    if (resultText && resultText.includes("PASSED")) {
      aChuck.removeLastCode();
      setStopDiabled(true)
    }
  }, [resultText, aChuck, setStopDiabled]);

  return (
    <Group>
      <Button
        mt="4px"
        mb="1px"
        ml="5px"
        // variant="primary"
        color="secondary"
        size="compact-lg"
        disabled={ !stopDiabled } 
        onClick={() => {
          setStopDiabled(false)
          loadAndRunChucKCode(props.filename, setResultText, Chuck, setAChuck, props.dir)
        }}
      >{ props.desc }
      </Button>
      {/* { resultTextfield } */}
      <Button
        mt="4px"
        mb="1px"
        ml="5px"
        size="compact-lg"
        disabled={stopDiabled}
        variant="danger"
        onClick={() => {
          aChuck.removeLastCode();
          setStopDiabled(true)
        }}
        >
        Stop
      </Button>
     </Group>

  )
}