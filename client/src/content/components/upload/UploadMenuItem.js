import React, { useCallback } from "react";
import { useEventListener } from '@mantine/hooks';
import { Menu } from '@mantine/core';

function UploadMenuItem(props) {
    const openDrawer = useCallback(() => {
        props.setTargetName('upload')
        props.setRefTarget(true)}
    )
    const ref = useEventListener('click', openDrawer);
    return (
        <Menu.Item ref={ref} onClick={ props.toggle }>Upload</Menu.Item>
    )
}
export default UploadMenuItem
