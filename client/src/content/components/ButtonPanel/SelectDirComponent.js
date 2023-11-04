import React from "react";
import { Select } from '@mantine/core';

import { useStore } from '../../../store'

function SelectDirComponent({
    selectedFilename,
    asyncDirs,
    selectedDir,
    setSelectedDir
  }) {

  const shredId = useStore(state => state.shredId)

  return (
    <>
    { shredId > 0 ?
        <Select
          data={asyncDirs}
          value={selectedDir}
          disabled
        /> :
        <Select
          data={asyncDirs}
          value={selectedDir}
          onChange={setSelectedDir}
        />
      }
    </>
  )
}
export default React.memo(SelectDirComponent)
