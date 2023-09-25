import { Box, Group } from '@mantine/core';

import { ZustandBearCount } from './ZustandBearCount'
import { ZustandBearButton } from './ZusstandBearButton'
import {SERVER_HOST, SERVER_PORT, BUTTON_PANEL_WIDTH, BUTTON_PANEL_HEIGHT, BUTTON_PANEL_VERTICAL_MARGIN} from '../../../../clientConstants';

export const ZustandJungle = () => {
    return (
        <Box w={ BUTTON_PANEL_WIDTH - BUTTON_PANEL_VERTICAL_MARGIN }>
            <ZustandBearCount />
            <ZustandBearButton />
        </Box>

    )
}