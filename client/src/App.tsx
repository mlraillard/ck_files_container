import { AppShell, Aside, Box, Header, Navbar, ScrollArea } from "@mantine/core";
  //import "./styles.css"; // apply "body {overflow: hidden;}" to hide browser scrollbars
import { useViewportSize } from '@mantine/hooks';


import { MainComponent } from './content/components/main/MainComponent'
//import MainFooter from './content/components/main/footer/MainFooter'
import { MainHeader} from './content/components/main/header/MainHeader'
  
  export default function App() {
    const { height, width } = useViewportSize();
    const mainContentPadding = 16;
  
    return (
        <AppShell
          //header={<Header height={60}>Header Content</Header>}
          header={<MainHeader />}
          //footer={<MainFooter />}

          style={{ 
            //height: height - 400,
            //width: width - 32}

            //height: height - 5,
            width: width
            }
          }

          
          //footer={<Footer height={20}>Footer Content</Footer>}
          //navbar={<Navbar width={{ base: 60 }}>Navbar</Navbar>}
          //aside={<Aside width={{ base: 40 }}>Aside</Aside>}
          
          styles={{
            main: {
            //   paddingTop: "var(--mantine-header-height, 0px)", // remove padding from mantine main component
            //   paddingBottom: "var(--mantine-footer-height, 0px)",
            // //   paddingLeft: "var(--mantine-navbar-width, 0px)",
            // //   paddingRight: "var(--mantine-aside-width, 0px)"
            paddingTop: "xs",
            paddingBottom: "xs",
            paddingLeft: "xs",
            paddingRight: "xs"
            }
          }}
        >
          {/* <ScrollArea


            style={{ 
              //height: height - 400,
              //width: width - 32}

              height: height - 32
              }
}

            //style={{ height: height - 120 }}
            
            // sx={{
            //   height: 300
            //   // height: "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, px))"// viewport height - height of header - height of footer
            // }}
            type="always"
            > */}

            <Box // our new canvas body
              p={mainContentPadding} // re-apply mantine main component padding
              sx={{
                 minWidth: `calc(${width} - ${2 * mainContentPadding}px `, 

                 //viewport width - 2*padding - aside width - navbar width
                // minHeight: `calc(${height} - ${2 * mainContentPadding}px - 120px)` 
                 
                 // viewport height - 2*padding - header height - footer height
              }}
            >
                {/* <div>{`${height} --- ${width}`}</div> */}
                <MainComponent />
            </Box>

          {/* </ScrollArea> */}
        
        </AppShell>
    );
  }