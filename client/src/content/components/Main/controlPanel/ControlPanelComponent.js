import React, { useCallback } from "react";
import { Flex, Button } from '@mantine/core';

import { useStore } from '../../../../store';
import { UploadComponent } from '../../upload/UploadComponent'
// import DeleteButton from "../../delete/DeleteButton";
// import { ViewCodeButton } from "../../viewCode/viewCodeButton";

function ControlPanelComponent() {

    // const selectedDir = useStore(state => state.selectedDir)
    // const selectedFilename = useStore(state => state.selectedFilename)

    // const memoizedSelected = useCallback(() => {
    //     return selectedFilename && selectedDir
    // }, [selectedFilename, selectedDir]); 

  return (
    <Flex
      mih={50}
      bg="rgba(0, 0, 0, .3)"
      gap="md"
      justify="flex-end"
      align="center"
      direction="row"
      wrap="nowrap"

      style={{
        backgroundColor: "transparent"
      }}
    >
      <UploadComponent />
      {/* <DeleteButton 
        memoizedSelected={memoizedSelected}
      /> */}
      {/* <ViewCodeButton /> */}
    </Flex>
  );
}

export default React.memo(ControlPanelComponent)