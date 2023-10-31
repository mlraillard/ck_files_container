import React, { useState, useCallback } from "react";
import { useDisclosure } from '@mantine/hooks';
import { Burger, Menu } from '@mantine/core';

import { useStore } from '../../../../store';
import UploadMenuItem from "../../upload/UploadMenuItem";
import SettingsMenuItem from "../../settings/SettingsMenuItem";
import ViewCodeMenuItem from "../../viewCode/ViewCodeMenuItem";
import { UploadDrawer } from "../../upload/UploadDrawer";
import { SettingsDrawer } from "../../settings/SettingsDrawer";
import { ViewCodeDrawer } from "../../viewCode/ViewCodeDrawer";

function ControlPanelMobile() {
    const selectedDir = useStore(state => state.selectedDir)
    const selectedFilename = useStore(state => state.selectedFilename)
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

            targetName === 'viewCode' ?
            <ViewCodeDrawer
                opened={refTarget}
                close={setRefTarget}
            />
            :
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
                {
                    selectedFilename && selectedDir ?
                        <ViewCodeMenuItem
                            toggle={toggle}
                            setRefTarget={setRefTarget}
                            setTargetName={setTargetName}
                            disabled={false}
                        />  :
                        <ViewCodeMenuItem
                            toggle={toggle}
                            setRefTarget={setRefTarget}
                            setTargetName={setTargetName}
                            disabled={true}
                        />
                }
            </Menu.Dropdown>
        </Menu>
        </>
    );
}
export default ControlPanelMobile
