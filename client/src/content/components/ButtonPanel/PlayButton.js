import { Button } from '@mantine/core';

export const PlayButton = (props) => {
    return (
      <Button
        variant="contained"
        color="secondary"
        size="md"
        disabled={false} 
        onClick={() => { 
          console.log(`clicked ${props.filename}`)
        }}
      >{ props.desc }
      </Button>
    )
}