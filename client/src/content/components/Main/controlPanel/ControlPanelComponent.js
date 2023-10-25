import React, { useCallback } from "react";
import { Flex } from '@mantine/core';

import { useStore } from '../../../../store';
import { UploadAnchor } from '../../upload/UploadAnchor'
import DeleteAnchor from "../../delete/DeleteAnchor";
import { ViewCodeAnchor } from "../../viewCode/ViewCodeAnchor";
import { SettingsAnchor } from "../../settings/SettingsAnchor";

function ControlPanelComponent() {

    const selectedDir = useStore(state => state.selectedDir)
    const selectedFilename = useStore(state => state.selectedFilename)

    const memoizedSelected = useCallback(() => {
        return selectedFilename && selectedDir
    }, [selectedFilename, selectedDir]); 

  return (
    <Flex
      //mr={"25px"}
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
      <SettingsAnchor />
      <UploadAnchor />
      <DeleteAnchor 
        memoizedSelected={memoizedSelected}
      />
      <ViewCodeAnchor />
    </Flex>
  );
}

export default React.memo(ControlPanelComponent)