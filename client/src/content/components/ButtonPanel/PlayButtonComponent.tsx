import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from "react";
import PropTypes from 'prop-types';
import { Group, Button, Text } from '@mantine/core';
//import { notifications } from '@mantine/notifications';
// import { runChucKCode, loadChucKCode } from "../chuckContent/chuckRun/run.js";

const PlayButtonComponent = (props: { desc: string, filename: string} ) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [resultText, setResultText] = useState("");
  //import('../chuckContent/chuckSrc/wc-bundle.js').then(async (module) => { setIsDisabled(false); });
  const resultTextfield = <Text fz="md">{ resultText }</Text>;

  return (
    <Group>
      <Button
        variant="contained"
        color="primary"
        size="md"
        disabled={isDisabled}
        // onClick={() => { runChucKCode(test, setResultText); }}

        //onClick={() => { loadChucKCode(test, setResultText); }}
      >
        {props.desc}
      </Button>
      { resultTextfield }
    </Group>
  );
};

// ButtonComponent.propTypes = {
//   desc: PropTypes.string,
//   code: PropTypes.string,
// };

export default PlayButtonComponent;