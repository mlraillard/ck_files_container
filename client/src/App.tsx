import { AppShell, Box } from "@mantine/core";
import { MainComponent } from './content/components/main/MainComponent'
import { MainHeader} from './content/components/main/header/MainHeader'
  
  export default function App() {
    return (
        <AppShell header={<MainHeader />}>
            <Box
              pl={{ base: 0, sm: 10, md: 30 }}
            >
                <MainComponent />
            </Box>        
        </AppShell>
    );
  }