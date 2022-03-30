import { Paper } from "@mui/material";
import { useState } from "react";
import ButtonIcon from "../../components/ButtonIcon";
import DataGrid from "../../components/DataGrid";
import DeleteSvg from "../../components/Icons/DeleteSvg";
import CreateSvg from "../../components/Icons/CreateSvg";
import AddSvg from "../../components/Icons/AddSvg";
import { Outlet, useNavigate } from "react-router-dom";

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
    field: "address",
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
    address: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT02",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Admin",
    address: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT03",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Thanh tra viên",
    address: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT04",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Admin",
    address: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT05",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Thanh tra viên",
    address: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT06",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Thanh tra viên",
    address: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT07",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Admin",
    address: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT08",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Admin",
    address: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT09",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Admin",
    address: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
];

function UserDataGrid() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleTableChanged = (dataBegin, rowsPerPage) => {
    setIsLoading(true);
    setTimeout(() => {
      setData(fakeData.slice(dataBegin, dataBegin + rowsPerPage));
      setIsLoading(false);
    }, 1000);
  };

  const actionButtons = [
    {
      IconComponent: CreateSvg,
      color: "blue.500",
      handleClicked: (row) => {
        navigate(row.email, {
          state: row,
        });
      },
    },
    {
      IconComponent: DeleteSvg,
      color: "red.500",
      handleClicked: (row) => {
        navigate("Delete", {
          state: row,
        });
      },
    },
  ];

  // Render
  const FooterComponent = (
    <ButtonIcon variant="outlined" onClick={() => navigate("Add")} LeftIcon={AddSvg}>
      Thêm mới
    </ButtonIcon>
  );

  return (
    <Paper elevation={2} sx={{ marginTop: 4 }}>
      <DataGrid
        headers={headers}
        data={data}
        isLoading={isLoading}
        count={fakeData.length}
        onTableChange={handleTableChanged}
        actionButtons={actionButtons}
        FooterComponent={FooterComponent}
      />
    </Paper>
  );
}

export default UserDataGrid;
