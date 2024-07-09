import React, { useState } from "react";
import {
  Box,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

// using the "display: flex"
const DropdownSearchBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState("Everything");
  const [placeholder, setPlaceholder] = useState("Search Anything...");

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item: string) => {
    setSelectedItem(item);
    setPlaceholder(`Search in ${item}...`);
    handleClose();
  };

  const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Search clicked!");
  };

  const items = ["Everything", "Videos", "Community", "Playlists", "Shorts"];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
        backgroundColor: "#9ab3f5",
      }}
    >
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: 700,
          borderRadius: 50,
          padding: "2px 4px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: 280,
            borderRadius: 50,
            backgroundColor: "#9a1663",
            color: "#ffffff",
            padding: "1rem 1.5rem",
            cursor: "pointer",
            position: "relative",
          }}
          onClick={handleClick}
        >
          <Typography sx={{ fontWeight: 500 }}>{selectedItem}</Typography>
          <ExpandMoreIcon
            sx={{ marginLeft: "auto", transition: "transform 0.5s" }}
            style={{ transform: anchorEl ? "rotate(-180deg)" : "rotate(0deg)" }}
          />
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            sx: {
              width: anchorEl ? anchorEl.clientWidth : undefined,
            },
          }}
          sx={{
            mt: 2, // Adjust the margin-top value for distance
            ".MuiPaper-root": {
              borderRadius: 3,
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
            },
          }}
        >
          {items.map((item) => (
            <MenuItem
              key={item}
              onClick={() => handleMenuItemClick(item)}
              sx={{
                fontWeight: 500,
                "&:hover": { marginLeft: "0.5rem", color: "#9a1663" },
                transition: "margin-left 0.2s ease, color 0.2s ease",
                // prettier-ignore
                backgroundColor: selectedItem === item ? "#f0f0f0" : "transparent",
              }}
            >
              {item}
            </MenuItem>
          ))}
        </Menu>
        <InputBase
          sx={{
            marginLeft: 1,
            flex: 1,
            padding: "1rem",
            fontWeight: 500,
            color: "#9a1663",
          }}
          placeholder={placeholder}
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton
          type="submit"
          sx={{
            p: 0,
            color: "#9a1663",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f3f3f3",
            marginLeft: 1,
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
          aria-label="search"
          onClick={handleSearchClick}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

// using the "display: inline-flex"

const DropdownSearchBar2 = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState("Everything");
  const [placeholder, setPlaceholder] = useState("Search Anything...");

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.info("value: ", event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item: string) => {
    setSelectedItem(item);
    setPlaceholder(`Search in ${item}...`);
    handleClose();
  };

  const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent default behavior
    // Add logic for search functionality here
    console.log("Search clicked!");
  };

  const items = ["Everything", "Videos", "Community", "Playlists", "Shorts"];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
        backgroundColor: "#9ab3f5",
      }}
    >
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: 700,
          borderRadius: 50,
          padding: "2px 4px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: 280,
            borderRadius: 50,
            backgroundColor: "#9a1663",
            color: "#ffffff",
            padding: "1rem 1.5rem",
            cursor: "pointer",
            position: "relative",
          }}
          onClick={handleClick}
        >
          <Typography sx={{ fontWeight: 500 }}>{selectedItem}</Typography>
          <ExpandMoreIcon
            sx={{ marginLeft: "auto", transition: "transform 0.5s" }}
            style={{ transform: anchorEl ? "rotate(-180deg)" : "rotate(0deg)" }}
          />
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            sx: {
              width: anchorEl ? anchorEl.clientWidth : undefined,
            },
          }}
          sx={{
            mt: 1.5, // Adjust the margin-top value for distance
            ".MuiPaper-root": {
              borderRadius: 3,
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
            },
          }}
        >
          {items.map((item) => (
            <MenuItem
              key={item}
              onClick={() => handleMenuItemClick(item)}
              sx={{
                fontWeight: 500,
                "&:hover": { marginLeft: "0.5rem", color: "#9a1663" },
                transition: "margin-left 0.2s ease, color 0.2s ease",
                // prettier-ignore
                backgroundColor: selectedItem === item ? "#f0f0f0" : "transparent",
              }}
            >
              {item}
            </MenuItem>
          ))}
        </Menu>
        <InputBase
          sx={{
            marginLeft: 1,
            flex: 1,
            padding: "1rem",
            fontWeight: 500,
            color: "#9a1663",
          }}
          placeholder={placeholder}
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton
          type="submit"
          sx={{
            p: 0,
            color: "#9a1663",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            display: "inline-flex", // changed to inline-flex
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f3f3f3",
            marginLeft: 1,
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
          aria-label="search"
          onClick={handleSearchClick}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

// using the "display: grid"

const DropdownSearchBar3 = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState("Everything");
  const [placeholder, setPlaceholder] = useState("Search Anything...");

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item: string) => {
    setSelectedItem(item);
    setPlaceholder(`Search in ${item}...`);
    handleClose();
  };

  const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Search clicked!");
  };

  const items = ["Everything", "Videos", "Community", "Playlists", "Shorts"];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
        backgroundColor: "#9ab3f5",
      }}
    >
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: 700,
          borderRadius: 50,
          padding: "2px 4px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: 280,
            borderRadius: 50,
            backgroundColor: "#9a1663",
            color: "#ffffff",
            padding: "1rem 1.5rem",
            cursor: "pointer",
            position: "relative",
          }}
          onClick={handleClick}
        >
          <Typography sx={{ fontWeight: 500 }}>{selectedItem}</Typography>
          <ExpandMoreIcon
            sx={{ marginLeft: "auto", transition: "transform 0.5s" }}
            style={{ transform: anchorEl ? "rotate(-180deg)" : "rotate(0deg)" }}
          />
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            sx: {
              width: anchorEl ? anchorEl.clientWidth : undefined,
            },
          }}
          sx={{
            mt: 1.5, // Adjust the margin-top value for distance
            ".MuiPaper-root": {
              borderRadius: 3,
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
            },
          }}
        >
          {items.map((item) => (
            <MenuItem
              key={item}
              onClick={() => handleMenuItemClick(item)}
              sx={{
                fontWeight: 500,
                "&:hover": { marginLeft: "0.5rem", color: "#9a1663" },
                transition: "margin-left 0.2s ease, color 0.2s ease",
              }}
            >
              {item}
            </MenuItem>
          ))}
        </Menu>
        <InputBase
          sx={{
            marginLeft: 1,
            flex: 1,
            padding: "1rem",
            fontWeight: 500,
            color: "#9a1663",
          }}
          placeholder={placeholder}
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton
          type="submit"
          sx={{
            p: 0,
            color: "#9a1663",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            display: "grid", // changed to grid
            placeItems: "center", // centers the icon
            backgroundColor: "#f3f3f3",
            marginLeft: 1,
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
          aria-label="search"
          onClick={handleSearchClick}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

// using the "position: absolute"

const DropdownSearchBar4 = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = React.useState("Everything");
  const [placeholder, setPlaceholder] = React.useState("Search Anything...");

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item: string) => {
    setSelectedItem(item);
    setPlaceholder(`Search in ${item}...`);
    handleClose();
  };

  const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Search clicked!");
  };

  const items = ["Everything", "Videos", "Community", "Playlists", "Shorts"];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
        backgroundColor: "#9ab3f5",
      }}
    >
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: 700,
          borderRadius: 50,
          padding: "2px 4px",
          position: "relative", // Parent container for absolute positioning
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: 280,
            borderRadius: 50,
            backgroundColor: "#9a1663",
            color: "#ffffff",
            padding: "1rem 1.5rem",
            cursor: "pointer",
            position: "relative", // Container for absolute positioning
          }}
          onClick={handleClick}
        >
          <Typography sx={{ fontWeight: 500 }}>{selectedItem}</Typography>
          <ExpandMoreIcon
            sx={{
              marginLeft: "auto",
              transition: "transform 0.5s",
              position: "absolute",
              right: "15px", // Adjust as needed for icon position
            }}
            style={{ transform: anchorEl ? "rotate(-180deg)" : "rotate(0deg)" }}
          />
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            sx: {
              width: anchorEl ? anchorEl.clientWidth : undefined,
            },
          }}
          sx={{
            mt: 1.5, // Adjust the margin-top value for distance
            ".MuiPaper-root": {
              borderRadius: 3,
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
            },
          }}
        >
          {items.map((item) => (
            <MenuItem
              key={item}
              onClick={() => handleMenuItemClick(item)}
              sx={{
                fontWeight: 500,
                "&:hover": { marginLeft: "0.5rem", color: "#9a1663" },
                transition: "margin-left 0.2s ease, color 0.2s ease",
              }}
            >
              {item}
            </MenuItem>
          ))}
        </Menu>
        <InputBase
          sx={{
            marginLeft: 1,
            flex: 1,
            padding: "1rem",
            fontWeight: 500,
            color: "#9a1663",
          }}
          placeholder={placeholder}
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton
          type="submit"
          sx={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#9a1663",
          }}
          aria-label="search"
          onClick={handleSearchClick}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export {
  DropdownSearchBar,
  DropdownSearchBar2,
  DropdownSearchBar3,
  DropdownSearchBar4,
};
