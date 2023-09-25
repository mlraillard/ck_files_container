import { Button } from '@mantine/core';
import { useAppStore } from '../../../appStore'

export const ZustandBearButton = () => {
    const increasePopulation = useAppStore(state => state.increasePopulation)

    return (
        <Button
        variant="contained"
        color="secondary"
        size="md"
        disabled={false} 
        onClick={() => { 
          console.log(`clicked!`)
          increasePopulation()
        }}
       >
        Add Bears
        </Button>
    )
}