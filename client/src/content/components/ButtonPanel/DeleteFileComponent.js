import React, { useState, useEffect } from "react";
//import { useDisclosure, useFocusWithin } from '@mantine/hooks';
import { Button  } from '@mantine/core';

export const DeleteFileComponent = (props) => {

    const onSubmit = async (e) => {
    }

    return (
        <Button
            mt="4px"
            mb="1px"
            ml="5px"
            size="compact-lg"
            //disabled={stopDiabled}
            variant="danger"
            //onClick={() => {
            //  aChuck.removeLastCode();
            //  setStopDiabled(true)
            //}}
            >
            Delete File
        </Button>
    )
}
