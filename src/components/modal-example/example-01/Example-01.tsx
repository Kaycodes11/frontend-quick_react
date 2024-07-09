import React from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface AccountModalProps {
  open: boolean;
  onClose: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ open, onClose }) => {
  const [accountName, setAccountName] = React.useState("");
  const [apiKey, setApiKey] = React.useState("");
  const [websiteURL, setWebsiteURL] = React.useState("");

  // @ts-expect-error type is not provided
  const handleAccountNameChange = (e) => setAccountName(e.target.value);
  // @ts-expect-error type is not provided
  const handleApiKeyChange = (e) => setApiKey(e.target.value);
  // @ts-expect-error type is not provided
  const handleWebsiteURLChange = (e) => setWebsiteURL(e.target.value);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <img
          src="https://source.unsplash.com/random/400x200"
          alt="Unsplash Random"
          style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
        />
        <Typography variant="h6" sx={{ mb: 2 }}>
          Account Details
        </Typography>
        <TextField
          label="Account Name"
          fullWidth
          variant="outlined"
          margin="normal"
          value={accountName}
          onChange={handleAccountNameChange}
        />
        <TextField
          label="API Key"
          fullWidth
          variant="outlined"
          margin="normal"
          value={apiKey}
          onChange={handleApiKeyChange}
        />
        <TextField
          label="Website URL"
          fullWidth
          variant="outlined"
          margin="normal"
          value={websiteURL}
          onChange={handleWebsiteURLChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={{ color: "text.disabled" }}>
                  https://
                </Typography>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Next
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export { AccountModal };
