import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import DataGrid from "../../components/DataGrid";

const headers = [
  { field: "id", headerName: "ID", minWidth: 80, color: "gray.700" },
  {
    field: "firstJoinDate",
    headerName: "NGÀY THAM GIA",
    minWidth: 160,
    color: "gray.500",
  },
  {
    field: "name",
    headerName: "HỌ VÀ TÊN",
    minWidth: 200,
    color: "gray.500",
  },
  {
    field: "email",
    headerName: "EMAIL",
    minWidth: 240,
    color: "gray.500",
  },
  {
    field: "phone",
    headerName: "SỐ ĐIỆN THOẠI",
    minWidth: 120,
    color: "gray.500",
  },
  {
    field: "role",
    headerName: "VAI TRÒ",
    minWidth: 140,
    color: "gray.500",
  },
  {
    field: "contactLocation",
    headerName: "ĐỊA CHỈ LIÊN HỆ",
    minWidth: 300,
    color: "gray.500",
  },
];

const fakeData = [
  {
    id: "TT01",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Admin",
    contactLocation: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT02",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Admin",
    contactLocation: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT03",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Thanh tra viên",
    contactLocation: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT04",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Admin",
    contactLocation: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT05",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Thanh tra viên",
    contactLocation: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT06",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Thanh tra viên",
    contactLocation: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT07",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Admin",
    contactLocation: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT08",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Admin",
    contactLocation: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT09",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Admin",
    contactLocation: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
];

function UserDataGrid() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleTableChanged = (dataBegin, dataEnd) => {
    setIsLoading(true);
    setTimeout(() => {
      setData(fakeData.slice(dataBegin, dataEnd));
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Paper elevation={2} sx={{ marginTop: 4 }}>
      <DataGrid
        headers={headers}
        data={data}
        isLoading={isLoading}
        count={fakeData.length}
        onTableChange={handleTableChanged}
      />
    </Paper>
  );
}

export default UserDataGrid;
