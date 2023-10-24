import React from "react";
import { Anchor } from '@mantine/core';

function DeleteAnchor({
  memoizedSelected
}) {

    return (
        <>
          { memoizedSelected() ?
          <Anchor
            component="button"
            //style={{ fontSize: 'calc(12px + 0.390625vw)'}}
            style={{ fontSize: 'calc(10px + 0.390625vw)'}}
            onClick={() => {
            }}
          >Delete
          </Anchor>
            :
          <Anchor
            component="button"
            //style={{ fontSize: 'calc(12px + 0.390625vw)'}}
            disabled
            underline="never"
            style={{color: "gray", textDecoration:'none', fontSize: 'calc(10px + 0.390625vw)'}}
          >Delete
          </Anchor>
          }
        </>
    )
}

export default React.memo(DeleteAnchor)

