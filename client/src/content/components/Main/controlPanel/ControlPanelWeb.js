import React from "react";
import { Group } from '@mantine/core';

import UploadAnchor from '../../upload/UploadAnchor'
import DeleteAnchor from "../../delete/DeleteAnchor";
import { ViewCodeAnchor } from "../../viewCode/ViewCodeAnchor";
import { SettingsAnchor } from "../../settings/SettingsAnchor";

function ControlPanelWeb(props) {
  return (
    <Group>
        <SettingsAnchor />
        <UploadAnchor />
        <DeleteAnchor memoizedSelected={props.memoizedSelected}/>
        <ViewCodeAnchor />
  </Group>
  );
}
export default ControlPanelWeb
