import { Box, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ButtonIcon from "../../components/ButtonIcon";
import DataGrid from "../../components/DataGrid";
import DeleteSvg from "../../components/Icons/DeleteSvg";
import CreateSvg from "../../components/Icons/CreateSvg";
import AddSvg from "../../components/Icons/AddSvg";

import useRequest from "../../hooks/useRequest";

const headers = [
  {
    field: "name",
    headerName: "TÊN CỬA HÀNG",
    minWidth: 200,
    color: "gray.500",
  },
  {
    field: "owner",
    headerName: "CHỦ CỬA HÀNG",
    minWidth: 120,
    color: "gray.500",
  },
  {
    field: "phone_number",
    headerName: "LIÊN HỆ",
    minWidth: 100,
    color: "gray.500",
  },
  {
    field: "item",
    headerName: "MẶT HÀNG KINH DOANH",
    minWidth: 180,
    color: "gray.500",
    transform: function (items = []) {
      return items.map(({ is_allowed, name }) => (
        <Box
          component="span"
          borderRadius={4}
          bgcolor={is_allowed ? "green.100" : "red.100"}
          color={is_allowed ? "green.500" : "red.500"}
          px={1}
          py="2px"
          mr={1}
        >
          {name}
        </Box>
      ));
    },
  },
  {
    field: "address",
    headerName: "ĐỊA CHỈ LIÊN HỆ",
    minWidth: 300,
    color: "gray.500",
    transform: function ({ district, province, street, ward }) {
      return `${street}, ${ward}, ${province}, ${district}`;
    },
  },
  {
    field: "status",
    headerName: "TRẠNG THÁI",
    minWidth: 160,
    color: "gray.500",
    transform: function (status) {
      const isActive = status === "active";
      return (
        <Box color={isActive ? "green.500" : "red.500"}>{isActive ? "Đang hoạt động" : "Ngừng hoạt động"}</Box>
      );
    },
  },
  {
    field: "certificate",
    headerName: "CHỨNG NHẬN ĐƯỢC CẤP",
    minWidth: 180,
    color: "gray.500",
    transform: function (certificates = []) {
      return certificates.map((certificate) => {
        const isActive = true; // TODO: Fix after complete certificate page
        return (
          <Box
            component="span"
            borderRadius={4}
            bgcolor={isActive ? "green.100" : "red.100"}
            color={isActive ? "green.500" : "red.500"}
            px={1}
            py="2px"
            mr={1}
          >
            {certificate.name}
          </Box>
        );
      });
    },
  },
];

function GroceryDataGrid({ shouldTableUpdate, query, onTableUpdate }) {
  const request = useRequest();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [numRecords, setNumRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(`Render datagrid ${shouldTableUpdate}`);

  const handleUpdateTable = (dataBegin, rowsPerPage) => {
    onTableUpdate();
    setIsLoading(true);

    console.log(query);

    request
      .get(`grocery`, {
        params: {
          offset: dataBegin,
          limit: rowsPerPage,
          value: query,
        },
      })
      .then((res) => {
        setData(res.data.result);
        setNumRecords(res.data.records);
        setIsLoading(false);
      });
  };

  const actionButtons = [
    {
      IconComponent: CreateSvg,
      color: "blue.500",
      handleClicked: (row) => {
        navigate(row.name, {
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
        shouldUpdate={shouldTableUpdate}
        isLoading={isLoading}
        count={numRecords}
        onUpdateTable={handleUpdateTable}
        actionButtons={actionButtons}
        FooterComponent={FooterComponent}
      />
    </Paper>
  );
}

export default GroceryDataGrid;
