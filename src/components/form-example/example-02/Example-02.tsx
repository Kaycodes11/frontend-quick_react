import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const SelectAndInput = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="select-label">Options</InputLabel>
        <Select labelId="select-label" id="select" label="Options">
          <MenuItem value={10}>Option 1</MenuItem>
          <MenuItem value={20}>Option 2</MenuItem>
        </Select>
      </FormControl>
      <TextField label="Input" variant="outlined" />
    </Box>
  );
};

export { SelectAndInput };
