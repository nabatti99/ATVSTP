import { Link, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ButtonIcon from "../../components/ButtonIcon";
import DataGrid from "../../components/DataGrid";
import DeleteSvg from "../../components/Icons/DeleteSvg";
import CreateSvg from "../../components/Icons/CreateSvg";
import AddSvg from "../../components/Icons/AddSvg";

import useRequest from "../../hooks/useRequest";
import { importDate } from "utilities/formatDate";

const headers = [
  {
    field: "schedule",
    headerName: "THỜI GIAN",
    minWidth: 120,
    color: "gray.500",
    transform: function (schedule) {
      return importDate(schedule).toLocaleString();
    },
  },
  {
    field: "authority",
    headerName: "ĐƠN VỊ CHỈ ĐỊNH THANH TRA",
    minWidth: 200,
    color: "gray.500",
  },
  {
    field: "groceries",
    headerName: "ĐƠN VỊ CẦN THANH TRA",
    minWidth: 200,
    color: "gray.500",
    transform: function (groceries) {
      return (
        <Stack>
          {groceries.map((grocery) => (
            <Typography variant="regular" mb={1} key={grocery}>
              {grocery}
            </Typography>
          ))}
        </Stack>
      );
    },
  },

  {
    field: "assigned_to",
    headerName: "PHÂN CÔNG",
    minWidth: 150,
    color: "gray.500",
    transform: function (inspectors) {
      return (
        <Stack>
          {inspectors.map((email) => (
            <Typography variant="regular" mb={1} key={email}>
              <Link href={`/UserDetail/${email}`}>{email}</Link>
            </Typography>
          ))}
        </Stack>
      );
    },
  },
  {
    field: "updated_by",
    headerName: "LẦN CUỐI CẬP NHẬT",
    minWidth: 120,
    color: "gray.500",
  },
];

function InspectionScheduleDataGrid({ shouldTableUpdate, query, onTableUpdate }) {
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
      .get(`inspection_schedule`, {
        params: {
          offset: dataBegin,
          limit: rowsPerPage,
          date_start: query.dateStart,
          date_end: query.dateEnd,
          is_draft: query.isDraft ? 1 : 0,
        },
      })
      .then((res) => {
        setData(res.data.result);
        setNumRecords(res.data.records);
        setIsLoading(false);
      });
  };

  const handleInspectionScheduleRowClicked = (row) => {
    navigate(`/InspectionScheduleDetail/${row._id}`);
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
        onRowClick={handleInspectionScheduleRowClicked}
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

export default InspectionScheduleDataGrid;
