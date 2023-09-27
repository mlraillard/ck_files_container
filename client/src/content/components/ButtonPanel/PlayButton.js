import { Button } from '@mantine/core';

export const PlayButton = () => {
    return (
      <Button
        variant="contained"
        color="secondary"
        size="md"
        disabled={false} 
        onClick={() => { 
          console.log(`clicked!`)
        }}
      >
      </Button>
    )
}