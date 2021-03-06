import { Paper } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import ButtonIcon from "../../components/ButtonIcon";
import DataGrid from "../../components/DataGrid";
import DeleteSvg from "../../components/Icons/DeleteSvg";
import CreateSvg from "../../components/Icons/CreateSvg";
import AddSvg from "../../components/Icons/AddSvg";

import useRequest from "../../hooks/useRequest";
import { connectAppContext } from "contexts/appContext/appContext";
import { deleteAccessToken } from "contexts/appContext/appActions";

const headers = [
  {
    field: "email",
    headerName: "EMAIL",
    minWidth: 240,
    color: "gray.500",
  },
  {
    field: "name",
    headerName: "HỌ VÀ TÊN",
    minWidth: 200,
    color: "gray.500",
  },
  {
    field: "phone",
    headerName: "SỐ ĐIỆN THOẠI",
    minWidth: 120,
    color: "gray.500",
  },
  {
    field: "type_manager",
    headerName: "VAI TRÒ",
    minWidth: 140,
    color: "gray.500",
    transform: function (value) {
      switch (value) {
        case "admin":
          return "Admin";

        case "inspector":
          return "Thanh tra viên";

        default:
          return;
      }
    },
  },
  {
    field: "work_from",
    headerName: "ĐỊA CHỈ LÀM VIỆC",
    minWidth: 300,
    color: "gray.500",
  },
  {
    field: "address",
    headerName: "ĐỊA CHỈ LIÊN HỆ",
    minWidth: 300,
    color: "gray.500",
  },
];

function UserDataGrid({ shouldTableUpdate, query, onTableUpdate, appContext, dispatch }) {
  const request = useRequest();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [numRecords, setNumRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const dataGridRef = useRef();

  console.log(`Render datagrid ${shouldTableUpdate}`);

  const handleUpdateTable = (dataBegin, rowsPerPage) => {
    onTableUpdate();
    setIsLoading(true);

    console.log(query);

    request
      .post(
        `manager/search`,
        {},
        {
          params: {
            offset: dataBegin,
            limit: rowsPerPage,
            value: query,
          },
        }
      )
      .then((res) => {
        setData(res.data.result);
        setNumRecords(res.data.records);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status == 401) {
          dispatch(deleteAccessToken());
          navigate("/Login", {
            replace: true,
          });
        }
      });
  };

  const handleUserRowClicked = (row) => {
    navigate(`/UserDetail/${row.email}`);
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

  const handleRestore = (row) => {
    return request.put(`manager/restore_a_manager/${row.email}`);
  };

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
        onRowClick={handleUserRowClicked}
        shouldUpdate={shouldTableUpdate}
        isLoading={isLoading}
        count={numRecords}
        onUpdateTable={handleUpdateTable}
        actionButtons={actionButtons}
        FooterComponent={FooterComponent}
        onRestore={handleRestore}
      />
    </Paper>
  );
}

export default connectAppContext(UserDataGrid);
