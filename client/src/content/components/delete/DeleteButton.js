import React from "react";
import { Button } from '@mantine/core';

// import { useStore } from '../../../store';

// export const DeleteButton = () => {

function DeleteButton({
  memoizedSelected
}) {

    // const [submitDisabled, setSubmitDisabled] = useState(true)
    
    //const selectedDir = useStore(state => state.selectedDir)
    //const selectedFilename = useStore(state => state.selectedFilename)

    return (
        <>
          { memoizedSelected() ?
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
            : ''
          }
        </>
    )
}

export default React.memo(DeleteButton)

