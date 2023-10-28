import React from "react";
import { Menu } from '@mantine/core';

function SettingsMenuItem(props) {
  return (
    <>
        <Menu.Item onClick={ props.toggle }>
            Settings
        </Menu.Item>
    </>
  )
}
export default SettingsMenuItem
