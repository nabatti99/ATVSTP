import SearchBar from "../../components/SearchBar";

function UserSearchBar({ onChange }) {
  return <SearchBar onChange={onChange} sx={{ padding: 2, marginTop: 4 }} />;
}

export default UserSearchBar;
