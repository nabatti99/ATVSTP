import { debounce, IconButton, InputBase, Paper } from "@mui/material";

import SearchSvg from "./Icons/SearchSvg";

function SearchBar({ placeholder = "Từ khoá tìm kiếm", onChange = () => {}, ...props }) {
  const handleKeywordChanged = debounce((event) => {
    onChange(event.target.value);
  }, 1000);

  return (
    <Paper elevation={2} {...props}>
      <Paper
        variant="outlined"
        sx={{ borderColor: "gray.200", display: "flex", alignItems: "center", paddingLeft: 2, paddingRight: 2 }}
      >
        <IconButton sx={{ marginTop: 1, marginBottom: 1 }}>
          <SearchSvg size={16} />
        </IconButton>

        <InputBase
          sx={{
            marginLeft: 1,
            flexGrow: 1,
          }}
          placeholder={placeholder}
          onChange={handleKeywordChanged}
        />
      </Paper>
    </Paper>
  );
}

export default SearchBar;
