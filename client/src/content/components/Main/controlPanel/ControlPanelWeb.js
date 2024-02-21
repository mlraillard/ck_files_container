import React from "react";
import { Group } from '@mantine/core';

import { useStore } from '../../../../store';
import UploadAnchor from '../../upload/UploadAnchor'
import DeleteAnchor from "../../delete/DeleteAnchor";
import { ViewCodeAnchor } from "../../viewCode/ViewCodeAnchor";
import { SettingsAnchor } from "../../settings/SettingsAnchor";

function ControlPanelWeb() {
  const settings = useStore(state => state.settings)
  const settingsEnableUpload = settings.enableUpload === 'true' && (settings.currentFiles < settings.maxFiles)
  const settingsEnableDelete = settings.enableDelete === 'true'
  const settingsEnableView = settings.enableView === 'true'
  const settingsEnableSettings = settings.enableSettings === 'true'

  return (
    <Group>
        { settingsEnableSettings ? <SettingsAnchor /> : '' }
        { settingsEnableUpload ? <UploadAnchor /> : '' }
        { settingsEnableDelete ? <DeleteAnchor /> : '' }
        { settingsEnableView ? <ViewCodeAnchor /> : '' }
  </Group>
  );
}
export default ControlPanelWeb
