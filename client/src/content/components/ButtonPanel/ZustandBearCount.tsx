import { Group } from '@mantine/core'
import { useAppStore } from '../../../appStore'

export const ZustandBearCount = () => {
    const bears = useAppStore(state => state.bears)
    return (
        <Group>{`Bears: ${bears}`}</Group>
    )
}