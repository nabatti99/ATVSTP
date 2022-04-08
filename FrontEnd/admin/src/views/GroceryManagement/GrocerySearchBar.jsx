import SearchBar from "../../components/SearchBar";

function GrocerySearchBar({ onChange }) {
  return <SearchBar onChange={onChange} sx={{ padding: 2, marginTop: 4 }} />;
}

export default GrocerySearchBar;
