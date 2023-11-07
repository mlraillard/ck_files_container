import React, { useCallback } from "react";
import { useEventListener } from '@mantine/hooks';
import { Menu } from '@mantine/core';

function DeleteMenuItem(props) {
  const openDrawer = useCallback(() => {
      props.setTargetName('delete')
      props.setRefTarget(true)}
  )
  const ref = useEventListener('click', openDrawer);
  return (
      !props.disabled ?
      <Menu.Item ref={ref} onClick={ props.toggle }>Delete</Menu.Item>
      : ''
  )
}
export default DeleteMenuItem
