import React from "react";
import {
  Drawer,
  IconButton,
  Typography,
  Divider,
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Button,
  Avatar,
  TextField,
} from "@mui/material";

import {
  Close as CloseIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  DragIndicator as DragIndicatorIcon,
} from "@mui/icons-material";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

const RightDrawer: React.FC<DrawerProps> = ({ open, onClose }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 400, // Adjust width as needed
          backgroundColor: "white",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: "1.2rem" }}>
          User Permissions
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Tabs
        value={selectedTab}
        // @ts-expect-error type unknown
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Home" icon={<HomeIcon />} />
        <Tab label="Info" icon={<InfoIcon />} />
        <Tab label="Settings" icon={<SettingsIcon />} />
      </Tabs>
      <Divider />
      <Box sx={{ padding: 2, flexGrow: 1, overflowY: "auto" }}>
        {selectedTab === 0 && (
          <List>
            <ListItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home Content" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Additional Home Content" />
            </ListItem>
          </List>
        )}
        {selectedTab === 1 && (
          <List>
            <ListItem>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Info Content" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Additional Info Content" />
            </ListItem>
          </List>
        )}
        {selectedTab === 2 && (
          <List>
            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings Content" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Additional Settings Content" />
            </ListItem>
          </List>
        )}
      </Box>
    </Drawer>
  );
};

const RightDrawer2: React.FC<DrawerProps> = ({ open, onClose }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 400, // Adjust width as needed
          backgroundColor: "white",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
          User Permissions
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          padding: 2,
          display: "flex",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Avatar sx={{ width: 56, height: 56, marginRight: 2 }}>A</Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ fontWeight: 500 }}>Author Name</Typography>
          <Typography variant="body2" color="textSecondary">
            author@example.com
          </Typography>
        </Box>
        <Typography sx={{ color: "blue", cursor: "pointer" }}>
          View Profile
        </Typography>
      </Box>

      <Tabs
        value={selectedTab}
        // @ts-expect-error type unknown
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{
          backgroundColor: "#f5f5f5",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tab label="XS" />
        <Tab label="SM" />
        <Tab label="MD" />
        <Tab label="LG" />
        <Tab label="XL" />
      </Tabs>

      <Box sx={{ padding: 2, flexGrow: 1, overflowY: "auto" }}>
        {selectedTab === 0 && (
          <List>
            <ListItem>
              <ListItemIcon>
                <DragIndicatorIcon />
              </ListItemIcon>
              <ListItemText primary="Item 1" secondary="Editable" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DragIndicatorIcon />
              </ListItemIcon>
              <ListItemText primary="Item 2" secondary="Editable" />
            </ListItem>
          </List>
        )}
        {selectedTab === 1 && (
          <List>
            <ListItem>
              <ListItemIcon>
                <DragIndicatorIcon />
              </ListItemIcon>
              <ListItemText primary="Item 3" secondary="Editable" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DragIndicatorIcon />
              </ListItemIcon>
              <ListItemText primary="Item 4" secondary="Editable" />
            </ListItem>
          </List>
        )}
        {/* Add similar content for MD, LG, XL tabs */}
      </Box>

      <Divider />

      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Filter Options
        </Typography>
        <TextField
          fullWidth
          placeholder="Search..."
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
      </Box>

      <Divider />

      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained" fullWidth color="primary">
              Save
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" fullWidth color="primary">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
};

export { RightDrawer, RightDrawer2 };
