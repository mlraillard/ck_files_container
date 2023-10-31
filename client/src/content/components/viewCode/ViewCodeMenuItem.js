import React, { useCallback } from "react";
import { useEventListener } from '@mantine/hooks';
import { Menu } from '@mantine/core';


function ViewCodeMenuItem ({
    toggle,
    setRefTarget,
    setTargetName,
    disabled
}) {

  const openDialog = useCallback(() => {
      console.log(`MI.openDialog`);
      setTargetName('viewCode')
      setRefTarget(true)}
  )
  const ref = useEventListener('click', openDialog);
  return (
        !disabled ?
        <Menu.Item ref={ref} onClick={ toggle }>View Code</Menu.Item>
        : ''     
  )
}
export default ViewCodeMenuItem
