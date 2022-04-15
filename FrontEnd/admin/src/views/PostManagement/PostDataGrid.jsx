import { Box, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ButtonIcon from "../../components/ButtonIcon";
import DataGrid from "../../components/DataGrid";
import DeleteSvg from "../../components/Icons/DeleteSvg";
import CreateSvg from "../../components/Icons/CreateSvg";
import AddSvg from "../../components/Icons/AddSvg";

import useRequest from "../../hooks/useRequest";
import Image from "../../components/Image";

const headers = [
  {
    field: "title",
    headerName: "TIÊU ĐỀ",
    minWidth: 280,
    color: "gray.700",
  },
  {
    field: "writer",
    headerName: "NGƯỜI VIẾT",
    minWidth: 100,
    color: "gray.700",
  },
  {
    field: "edit_by",
    headerName: "CHỈNH SỬA BỞI",
    minWidth: 100,
    color: "gray.500",
  },
  {
    field: "create_at",
    headerName: "XUẤT BẢN VÀO",
    minWidth: 160,
    color: "gray.500",
  },
  {
    field: "update_at",
    headerName: "LẦN CUỐI CẬP NHẬT",
    minWidth: 160,
    color: "gray.500",
  },
  {
    field: "delete_status",
    headerName: "TRẠNG THÁI",
    minWidth: 160,
    color: "gray.500",
    transform: function (status) {
      const info = {
        color: null,
        text: null,
      };

      switch (status) {
        case 1:
          info.color = "green.500";
          info.text = "Đang hoạt động";
      }
      return <Box color={info.color}>{info.text}</Box>;
    },
  },
];

function PostDataGrid({ shouldTableUpdate, query, onTableUpdate }) {
  const request = useRequest();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [numRecords, setNumRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  console.log(`Render datagrid ${shouldTableUpdate}`);

  const handleUpdateTable = (dataBegin, rowsPerPage) => {
    onTableUpdate();
    setIsLoading(true);

    console.log(query);

    request
      .get(`information/read`, {
        params: {
          offset: dataBegin,
          limit: rowsPerPage,
          value: query,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setNumRecords(res.data.total_page);
        setIsLoading(false);
      });
  };

  const handleCertificateRowClicked = (row) => {
    navigate(`/PostDetail/${row._id}`);
  };

  const actionButtons = [
    {
      IconComponent: CreateSvg,
      color: "blue.500",
      handleClicked: (row) => {
        navigate(row._id, {
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
        onRowClick={handleCertificateRowClicked}
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

export default PostDataGrid;
