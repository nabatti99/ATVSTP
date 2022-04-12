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
    field: "image_url",
    headerName: "",
    minWidth: 80,
    color: "gray.700",
    transform: function (imageUrl) {
      return imageUrl && <Image src={imageUrl} borderRadius={4} width={62} height={62} />;
    },
  },
  {
    field: "name",
    headerName: "TÊN",
    minWidth: 80,
    color: "gray.700",
  },
  {
    field: "manager",
    headerName: "ĐƠN VỊ PHÁT HÀNH",
    minWidth: 120,
    color: "gray.500",
  },
  {
    field: "effective_time",
    headerName: "THỜI GIAN HIỆU LỰC",
    minWidth: 100,
    color: "gray.500",
    transform: function (value) {
      return `${value} Tháng`;
    },
  },
  {
    field: "last_update",
    headerName: "LẦN CUỐI CẬP NHẬT",
    minWidth: 120,
    color: "gray.500",
  },
  {
    field: "is_active",
    headerName: "TRẠNG THÁI",
    minWidth: 160,
    color: "gray.500",
    transform: function (isActive) {
      return <Box color={isActive ? "green.500" : "red.500"}>{isActive ? "Còn hiệu lực" : "Hết hiệu lực"}</Box>;
    },
  },
];

function CertificateDataGrid({ shouldTableUpdate, query, onTableUpdate }) {
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
      .get(`certificate`, {
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

  const handleCertificateRowClicked = (row) => {
    navigate(`/CertificateDetail/${row.name}`);
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

export default CertificateDataGrid;
