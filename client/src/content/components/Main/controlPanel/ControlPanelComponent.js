import React, { useCallback } from "react";
import { Flex } from '@mantine/core';
//import { useViewportSize } from '@mantine/hooks';
import { useMediaQuery } from '@mantine/hooks';

import { useStore } from '../../../../store';
import ControlPanelWeb from "./ControlPanelWeb";
import ControlPanelMobile from "./ControlPanelModbile";

function ControlPanelComponent() {
    const smWidth = useMediaQuery('(min-width: 490px)')

  return (
      <Flex
      //mr={"25px"}
      //visibleFrom="sm"
      mih={50}
      bg="rgba(0, 0, 0, .3)"
      gap="xs"
      justify="flex-end"
      align="center"
      direction="row"
      wrap="nowrap"

      style={{
        backgroundColor: "transparent",
        margin: "0",
      }}
    >
      {
        !smWidth ? 
          <ControlPanelMobile /> : <ControlPanelWeb />
      }
    </Flex>
  );
}

export default React.memo(ControlPanelComponent)