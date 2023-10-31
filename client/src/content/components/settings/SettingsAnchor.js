import React from "react";
import { Anchor } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { SettingsDrawer } from "./SettingsDrawer";

export const SettingsAnchor = () => {
    const [opened, { open, close }] = useDisclosure(false)

    return (
        <>
        <SettingsDrawer
            opened={opened}
            open={open}
            close={close}
        />
        <Anchor
            component="button"
            style={{ fontSize: 'calc(10px + 0.390625vw)'}}
            onClick={open}>Settings</Anchor>
        </>
    )
}
