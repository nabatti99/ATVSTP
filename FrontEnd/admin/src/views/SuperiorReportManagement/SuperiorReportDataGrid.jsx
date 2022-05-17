import { Box, Link, Paper, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ButtonIcon from "../../components/ButtonIcon";
import DataGrid from "../../components/DataGrid";
import DeleteSvg from "../../components/Icons/DeleteSvg";
import CreateSvg from "../../components/Icons/CreateSvg";
import AddSvg from "../../components/Icons/AddSvg";

import useRequest from "../../hooks/useRequest";
import { exportDate, importDate } from "utilities/formatDate";

const headers = [
  {
    field: "title",
    headerName: "TIÊU ĐỀ BÁO CÁO",
    minWidth: 250,
    color: "gray.700",
  },
  {
    field: "reporting_area",
    headerName: "KHU VỰC BÁO CÁO",
    minWidth: 240,
    color: "gray.500",
  },
  {
    field: "inspected_groceries",
    headerName: "ĐỐI TƯỢNG BÁO CÁO",
    minWidth: 280,
    color: "gray.500",
    transform: function (groceries) {
      return (
        <Stack>
          {groceries.map((grocery) => (
            <Link href={`/GroceryDetail/${grocery}`} key={grocery} mb={1}>
              {grocery}
            </Link>
          ))}
        </Stack>
      );
    },
  },
  {
    field: "writer",
    headerName: "TÁC GIẢ",
    minWidth: 120,
    color: "gray.500",
    transform: function (email) {
      return <Link href={`/UserDetail/${email}`}>{email}</Link>;
    },
  },
  {
    field: "regulator_agency",
    headerName: "NƠI NHẬN BÁO CÁO",
    minWidth: 200,
    color: "gray.500",
  },
  {
    field: "is_draft",
    headerName: "TRẠNG THÁI",
    minWidth: 100,
    color: "gray.500",
    transform: function (is_draft) {
      return <Box color={!is_draft ? "green.500" : "red.500"}>{!is_draft ? "Đã gửi" : "Bản nháp"}</Box>;
    },
  },
  {
    field: "updated_at",
    headerName: "LẦN CUỐI CẬP NHẬT",
    minWidth: 180,
    color: "gray.500",
    transform: function (updated_at) {
      return importDate(updated_at).toLocaleString();
    },
  },
];

function SuperiorReportDataGrid({ shouldTableUpdate, query, onTableUpdate }) {
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
      .get(`superior_reporting`, {
        params: {
          offset: dataBegin,
          limit: rowsPerPage,
          date_start: query.dateStart,
          date_end: query.dateEnd,
          is_draft: query.isDraft,
        },
      })
      .then((res) => {
        setData(res.data.result);
        setNumRecords(res.data.records);
        setIsLoading(false);
      });
  };

  const handleSuperiorReportRowClicked = (row) => {
    navigate(`/SuperiorReportDetail/${row._id}`);
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
        onRowClick={handleSuperiorReportRowClicked}
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

export default SuperiorReportDataGrid;
