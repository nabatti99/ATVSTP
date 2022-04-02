import SearchBar from "../../components/SearchBar";

const searchGroups = [
  {
    field: "name",
    name: "Họ Và Tên",
  },
  {
    field: "email",
    name: "Email",
  },
];

function UserSearchBar({ onChange }) {
  return <SearchBar onChange={onChange} searchGroups={searchGroups} sx={{ padding: 2, marginTop: 4 }} />;
}

export default UserSearchBar;
