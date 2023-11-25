import React, { useState, useCallback } from "react";
import { useDisclosure } from '@mantine/hooks';
import { Burger, Menu } from '@mantine/core';

import { useStore } from '../../../../store';
import UploadMenuItem from "../../upload/UploadMenuItem";
import SettingsMenuItem from "../../settings/SettingsMenuItem";
import DeleteMenuItem from "../../delete/DeleteMenuItem";
import ViewCodeMenuItem from "../../viewCode/ViewCodeMenuItem";
import { UploadDrawer } from "../../upload/UploadDrawer";
import { SettingsDrawer } from "../../settings/SettingsDrawer";
import { DeleteDrawer  } from "../../delete/DeleteDrawer";
import { ViewCodeModal } from "../../viewCode/ViewCodeModal";

function ControlPanelMobile(props) {
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

            targetName === 'delete' ?
            <DeleteDrawer
                opened={refTarget}
                close={setRefTarget}
            /> :

            targetName === 'viewCode' ?
            <ViewCodeModal
                opened={refTarget}
                close={setRefTarget}
            /> : ''
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
                    <>
                        <DeleteMenuItem
                            toggle={toggle}
                            setRefTarget={setRefTarget}
                            setTargetName={setTargetName}
                            disabled={false}
                        />
                        <ViewCodeMenuItem
                            toggle={toggle}
                            setRefTarget={setRefTarget}
                            setTargetName={setTargetName}
                            disabled={false}
                        />  
                    </> :
                    <>
                        <DeleteMenuItem
                            toggle={toggle}
                            setRefTarget={setRefTarget}
                            setTargetName={setTargetName}
                            disabled={true}
                        />
                        <ViewCodeMenuItem
                            toggle={toggle}
                            setRefTarget={setRefTarget}
                            setTargetName={setTargetName}
                            disabled={true}
                        />
                    </>
                }
            </Menu.Dropdown>
        </Menu>
        </>
    );
}
export default ControlPanelMobile
