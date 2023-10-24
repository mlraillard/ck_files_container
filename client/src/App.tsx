import { AppShell, Box } from "@mantine/core";
import { MainComponent } from './content/components/main/MainComponent'
import { MainHeader} from './content/components/main/header/MainHeader'
  
  export default function App() {
    const mainContentPadding = 16;
  
    return (
        <AppShell
          header={<MainHeader />}
          styles={{
            main: {
            paddingTop: "xs",
            paddingBottom: "xs",
            paddingLeft: "xs",
            paddingRight: "xs"
            }
          }} >
            <Box p={mainContentPadding} >
                <MainComponent />
            </Box>        
        </AppShell>
    );
  }