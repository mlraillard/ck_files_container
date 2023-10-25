import React, { useState, useEffect } from "react";
import { Anchor, Group, Text, Dialog, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useStore } from '../../../store';
import { DIRECTORY_FILE } from '../../../routes';

export const SettingsAnchor = () => {
    const [opened, { open, close }] = useDisclosure(false)
    //const { height, width } = useViewportSize();

    return (
        <>
        <Anchor
            component="button"
            style={{ fontSize: 'calc(10px + 0.390625vw)'}}
            onClick={open}>Settings</Anchor>
        </>
    )
}
