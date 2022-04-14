import { Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ButtonIcon from "../../components/ButtonIcon";
import DataGrid from "../../components/DataGrid";
import DeleteSvg from "../../components/Icons/DeleteSvg";
import CreateSvg from "../../components/Icons/CreateSvg";
import AddSvg from "../../components/Icons/AddSvg";

import useRequest from "../../hooks/useRequest";

const headers = [
  {
    field: "name",
    headerName: "TÊN TỔ CHỨC",
    minWidth: 200,
    color: "gray.500",
  },
  {
    field: "phone_number",
    headerName: "LIÊN HỆ",
    minWidth: 120,
    color: "gray.500",
  },
  {
    field: "responsible",
    headerName: "CHỨC VỤ",
    minWidth: 200,
    color: "gray.500",
  },
];

function AdministrationDataGrid({ shouldTableUpdate, query, onTableUpdate }) {
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

    // request
    //   .get(`certificate`, {
    //     params: {
    //       offset: dataBegin,
    //       limit: rowsPerPage,
    //       value: query,
    //     },
    //   })
    //   .then((res) => {
    //     setData(res.data.result);
    //     setNumRecords(res.data.records);
    //     setIsLoading(false);
    //   });
  };

  const handleAdministrationRowClicked = (row) => {
    navigate(`/AdministrationDetail/${row.id}`);
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
        onRowClick={handleAdministrationRowClicked}
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

export default AdministrationDataGrid;
