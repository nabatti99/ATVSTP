import SearchBar from "../../components/SearchBar";

function PostSearchBar({ onChange }) {
  return <SearchBar onChange={onChange} sx={{ padding: 2, marginTop: 4 }} />;
}

export default PostSearchBar;
