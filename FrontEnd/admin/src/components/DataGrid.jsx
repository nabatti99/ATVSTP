import {
  IconButton,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";

import LeaderBoardSvg from "./Icons/LeaderBoardSvg";

// Buttons Fixed Width
const ACTION_WIDTH = 140;

function DataGrid({ headers = [], data = [], isLoading = true, count = 0, onTableChange }) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    handleTableChanged(page, rowsPerPage);
  }, []);

  const handleTableChanged = (page, rowsPerPage) => {
    const dataBegin = rowsPerPage * page;
    onTableChange(dataBegin, dataBegin + rowsPerPage);
  };

  const handlePageChanged = (event, newPage) => {
    setPage(newPage);
    handleTableChanged(newPage, rowsPerPage);
  };

  const handleRowsPerPageChanged = (event) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
    handleTableChanged(0, newRowsPerPage);
  };

  console.log(data);

  return (
    <Fragment>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header.field} sx={{ minWidth: header.minWidth }}>
                  <Typography variant="regular" color="gray.500">
                    {header.headerName}
                  </Typography>
                </TableCell>
              ))}

              <TableCell sx={{ minWidth: ACTION_WIDTH }} />
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading
              ? Array.from(Array(rowsPerPage)).map((_, index) => (
                  <TableRow key={index}>
                    {headers.map((header) => (
                      <TableCell key={header.field}>
                        <Skeleton variant="rectangular" />
                      </TableCell>
                    ))}

                    <TableCell align="center">
                      <Stack direction="row" justifyContent="center">
                        <Skeleton variant="circular" width={24} height={24} sx={{ marginRight: 1 }} />
                        <Skeleton variant="circular" width={24} height={24} />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              : data.map((row) => (
                  <TableRow key={row.id}>
                    {headers.map((header) => (
                      <TableCell key={header.field}>
                        <Typography variant="regular" color={header.color}>
                          {row[header.field]}
                        </Typography>
                      </TableCell>
                    ))}

                    <TableCell align="center">
                      <IconButton>
                        <LeaderBoardSvg color="gray.500" size={24} />
                      </IconButton>
                      <IconButton>
                        <LeaderBoardSvg color="gray.500" size={24} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        labelRowsPerPage="Số hàng hiển thị:"
        rowsPerPageOptions={[5, 10, 20]}
        rowsPerPage={rowsPerPage}
        showFirstButton
        showLastButton
        page={page}
        count={count}
        onPageChange={handlePageChanged}
        onRowsPerPageChange={handleRowsPerPageChanged}
      />
    </Fragment>
  );
}

export default DataGrid;
