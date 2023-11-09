import { AppShell, Box } from "@mantine/core";
import { MainComponent } from './content/components/main/MainComponent'
import { MainHeader} from './content/components/main/header/MainHeader'
  
  export default function App() {
    return (
        <AppShell 
          //header={<MainHeader />}
          header={{ height: 60 }}
          padding="xs"
        >
          <AppShell.Header>
            {/* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <div>Logo</div> */}
            <MainHeader />
          </AppShell.Header>
            <Box
              pl={{ base: 0, sm: 10, md: 30 }}
            >
                {/* <MainComponent /> */}
                Main Component goes here
            </Box>        
        </AppShell>
    );
  }