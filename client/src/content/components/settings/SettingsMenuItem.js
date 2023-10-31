import React, { useCallback } from "react";
import { useEventListener } from '@mantine/hooks';
import { Menu } from '@mantine/core';

function SettingsMenuItem(props) {
  const openDrawer = useCallback(() => {
      props.setTargetName('settings')
      props.setRefTarget(true)}
  )
  const ref = useEventListener('click', openDrawer);
  return (
      <Menu.Item ref={ref} onClick={ props.toggle }>Settings</Menu.Item>
  )
}
export default SettingsMenuItem
