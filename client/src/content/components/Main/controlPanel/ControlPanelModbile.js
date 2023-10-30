import React, { useState, useCallback } from "react";
import { useDisclosure } from '@mantine/hooks';
import { Burger, Menu } from '@mantine/core';

import UploadMenuItem from "../../upload/UploadMenuItem";
import SettingsMenuItem from "../../settings/SettingsMenuItem";
import { UploadDrawer } from "../../upload/UploadDrawer";
import { SettingsDrawer } from "../../settings/SettingsDrawer";

function ControlPanelMobile() {
    const [refTarget, setRefTarget] = useState(false);
    const [targetName, setTargetName] = useState('');
    const [opened, { toggle }] = useDisclosure(false)

    return (
        <>
        {
            targetName === 'upload' ?
            <UploadDrawer 
                opened={refTarget}
                close={setRefTarget}
            /> :
                targetName === 'settings' ?
                <SettingsDrawer
                    opened={refTarget}
                    close={setRefTarget}
                /> :
            ''
        }
        <Menu>
            <Menu.Target>
                <Burger opened={opened} onClick={toggle} size="sm" />
            </Menu.Target>
            <Menu.Dropdown>
                <SettingsMenuItem
                    toggle={toggle}
                    setRefTarget={setRefTarget}
                    setTargetName={setTargetName}
                />
                <UploadMenuItem
                    toggle={toggle}
                    setRefTarget={setRefTarget}
                    setTargetName={setTargetName}
                />
            </Menu.Dropdown>
        </Menu>
        </>
    );
}
export default ControlPanelMobile
