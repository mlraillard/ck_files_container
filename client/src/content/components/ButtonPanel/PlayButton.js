import { useState } from "react";
import { Group, Button, Text } from '@mantine/core';

import { runChucKCode, loadAndRunChucKCode } from "../../../chuckContent/chuckRun/run.js";

export const PlayButton = (props) => {
  const [resultText, setResultText] = useState("");
  const resultTextfield = <Text fz="md">{ resultText }</Text>;

  return (
    <Group>
      <Button
        variant="contained"
        color="secondary"
        size="compact-lg"
        disabled={false} 
        onClick={() => { 
          loadAndRunChucKCode(props.filename, setResultText)
        }}
      >{ props.desc }
      </Button>
      { resultTextfield }
    </Group>

  )
}