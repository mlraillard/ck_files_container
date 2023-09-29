import { useState } from "react";
import { Group, Button, Text } from '@mantine/core';

import { useStore } from '../../../store'
import { loadAndRunChucKCode } from "../../../chuckContent/chuckRun/run.js";

export const PlayButton = (props) => {
  const Chuck = useStore(state => state.Chuck)
  const [resultText, setResultText] = useState("");
  const resultTextfield = <Text fz="md">{ resultText }</Text>;

  return (
    <Group>
      <Button
        mt="4px"
        mb="1px"
        ml="5px"
        // variant="primary"
        color="secondary"
        size="compact-lg"
        disabled={false} 
        onClick={() => {
          loadAndRunChucKCode(props.filename, setResultText, Chuck)
        }}
      >{ props.desc }
      </Button>
      {/* { resultTextfield } */}
     </Group>

  )
}