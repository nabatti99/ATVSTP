import { debounce, IconButton, InputBase, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

import SearchSvg from "./Icons/SearchSvg";

function SearchBar({ searchGroups = [], onChange = () => {}, ...props }) {
  const [searchGroup, setSearchGroup] = useState(searchGroups[0].field);

  const handleKeywordChanged = debounce((event) => {
    onChange(searchGroup, event.target.value);
  }, 1000);

  return (
    <Paper elevation={2} {...props}>
      <Paper
        variant="outlined"
        sx={{ borderColor: "gray.200", display: "flex", alignItems: "center", paddingLeft: 2, paddingRight: 2 }}
      >
        <Typography variant="strong" color="gray.700" mr={1}>
          Tìm kiếm theo
        </Typography>

        <TextField
          select
          variant="standard"
          value={searchGroup}
          onChange={(event) => setSearchGroup(event.target.value)}
        >
          {searchGroups.map((searchGroup) => (
            <MenuItem key={searchGroup.field} value={searchGroup.field}>
              {searchGroup.name}
            </MenuItem>
          ))}
        </TextField>

        <InputBase
          sx={{
            paddingTop: 1,
            paddingBottom: 1,
            paddingLeft: 2,
            paddingRight: 2,
            flexGrow: 1,
          }}
          placeholder="Từ khoá tìm kiếm"
          onChange={handleKeywordChanged}
        />

        <IconButton sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1 }}>
          <SearchSvg size={16} />
        </IconButton>
      </Paper>
    </Paper>
  );
}

export default SearchBar;
