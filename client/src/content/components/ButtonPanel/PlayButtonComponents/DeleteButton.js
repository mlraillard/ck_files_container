import React from "react";
import { Button } from '@mantine/core';

function DeleteButton() {
    return (
        <Button
            mt="4px"
            mb="1px"
            ml="0"
            style={{ fontSize: 'calc(12px + 0.390625vw)'}}
            disabled={ false } 
            variant="danger"
            onClick={() => {
            }}
            >Delete
        </Button>
    )
}

export default React.memo(DeleteButton)

