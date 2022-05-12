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
import { Fragment, useEffect, useRef, useState } from "react";

import ReplaySvg from "./Icons/ReplaySvg";
import { exportDate, importDate } from "../utilities/formatDate";

function DataGrid({
  headers = [],
  data = [],
  isLoading = true,
  count = 0,
  shouldUpdate,
  actionButtons = [],
  FooterComponent = null,
  onUpdateTable,
  onRowClick = () => {},
  onRestore = async () => {},
}) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const updateTable = (page, rowsPerPage) => {
    const dataBegin = rowsPerPage * page;
    onUpdateTable(dataBegin, rowsPerPage);
  };

  const handlePageChanged = (event, newPage) => {
    setPage(newPage);
    updateTable(newPage, rowsPerPage);
  };

  const handleRowsPerPageChanged = (event) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
    updateTable(0, newRowsPerPage);
  };

  useEffect(() => {
    updateTable(page, rowsPerPage);
  }, [shouldUpdate]);

  const actionButtonsWidth = actionButtons.length > 0 ? 140 : 0;

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

              <TableCell sx={{ minWidth: actionButtonsWidth }} />
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
                  <TableRow
                    key={row.id}
                    sx={{
                      cursor: "pointer",
                      backgroundColor: row.date_delete ? "red.50" : "white",
                      "&:hover": {
                        backgroundColor: "gray.50",
                      },
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      onRowClick(row);
                    }}
                  >
                    {headers.map((header) => (
                      <TableCell key={header.field}>
                        <Typography variant="regular" color={header.color}>
                          {header.transform ? header.transform(row[header.field]) : row[header.field]}
                        </Typography>
                      </TableCell>
                    ))}

                    <TableCell align="center">
                      {row.date_delete ? (
                        <Stack direction="row" justifyContent="center" alignItems="center">
                          <IconButton>
                            <ReplaySvg
                              color="blue.500"
                              onClick={(event) => {
                                event.stopPropagation();
                                onRestore(row).then(() => updateTable(page, rowsPerPage));
                              }}
                            />
                          </IconButton>
                          <Typography variant="small" color="red.500">
                            {exportDate(importDate(row.date_delete))}
                          </Typography>
                        </Stack>
                      ) : (
                        actionButtons.map(({ IconComponent, color, handleClicked }) => (
                          <IconButton
                            key={IconComponent.name}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleClicked(row);
                            }}
                          >
                            <IconComponent color={color} />
                          </IconButton>
                        ))
                      )}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        {FooterComponent}
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
      </Stack>
    </Fragment>
  );
}

export default DataGrid;
