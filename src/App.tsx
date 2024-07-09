import React from "react";
import { Box, Button, CssBaseline, Divider } from "@mui/material";
import {
  FixedContainer,
  FullWidthHeightContainer,
} from "./components/container-example";
import { DropdownSearchBar2 } from "./components/form-example/example-01/Example-01";
import { RightDrawer2 } from "./components/drawer-example";
import { AccountModal } from "./components/modal-example";
import { SelectAndInput } from "./components/form-example";

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const toggleDrawer = React.useCallback(
    () => setDrawerOpen(!drawerOpen),
    [drawerOpen]
  );

  const toggleModal = React.useCallback(
    () => setModalOpen(!modalOpen),
    [modalOpen]
  );

  return (
    <React.Fragment>
      <CssBaseline enableColorScheme />
      {/* <BoxSx />
      <Divider /> */}

      <FixedContainer>
        {/* <BasicGrid /> */}
        {/* <MultipleBreakpoints /> */}
        {/* <SpacingGrid /> */}
        {/* <RowAndColumnSpacing /> */}
        {/* <ResponsiveGrid /> */}
        {/* <AutoGrid /> */}
        {/* <VariableWidthGrid /> */}
        {/* <NestedGrid /> */}
        {/* <ColumnsGrid /> */}
        {/* <UsingCSSGrid /> */}
        {/* <CustomCard /> */}
        {/* <DropdownSearchBar2 /> */}
        <SelectAndInput />
      </FixedContainer>

      <Divider />

      {/* <FullWidthHeightContainer>
        <Box>
          <Button onClick={toggleDrawer}>OPEN DRAWER</Button>
          <RightDrawer2 open={drawerOpen} onClose={toggleDrawer}></RightDrawer2>
          <Divider />

          <Button onClick={toggleModal}>OPEN MODAL</Button>
          <AccountModal open={modalOpen} onClose={toggleModal}></AccountModal>
        </Box>
      </FullWidthHeightContainer> */}
    </React.Fragment>
  );
}

export default App;

// customize: https://mui.com/material-ui/customization/how-to-customize/#4-global-css-override

// theming: https://mui.com/material-ui/customization/theme-components/#theme-default-props
