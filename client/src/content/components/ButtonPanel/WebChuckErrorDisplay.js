import React, { useState, useEffect } from 'react';
import { Alert, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Prism } from '@mantine/prism';

import { useStore } from '../../../store';
import { formatTextArrayToString } from '../../../utils';

export const WebChuckErrorDisplay = (props) => {
    const [opened, { open, close }] = useDisclosure(false);
    const chuckError = useStore(state => state.chuckError)
    const setChuckError = useStore(state => state.setChuckError)
    
    useEffect(() => {
        if (chuckError) { open() }
      }, [chuckError, open]);

    return (
        <Modal
            opened={ opened }
            onClose={
            () => {
                setChuckError('')
                close()
            }
            }
            title={chuckError.split('|')[0]}
            >
            <Alert
            //icon={<IconAlertCircle size="1rem" />}
            title="WebChucK Error"
            color="red">
                { chuckError.split('|')[1] }
            </Alert>
            <Prism language="markup" noCopy={true}>
                { formatTextArrayToString(props.result) }
            </Prism>
        </Modal>
    )
}