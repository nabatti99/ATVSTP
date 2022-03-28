import {
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Typography,
  IconButton,
  TableFooter,
  TablePagination,
  Skeleton,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";

import LeaderBoardSvg from "../../components/Icons/LeaderBoardSvg";

const headers = [
  { field: "id", headerName: "ID", width: 40, color: "gray.700" },
  {
    field: "firstJoinDate",
    headerName: "NGÀY THAM GIA",
    width: 100,
    color: "gray.500",
  },
  {
    field: "name",
    headerName: "HỌ VÀ TÊN",
    width: 80,
    color: "gray.500",
  },
  {
    field: "email",
    headerName: "EMAIL",
    width: 140,
    color: "gray.500",
  },
  {
    field: "phone",
    headerName: "SỐ ĐIỆN THOẠI",
    width: 100,
    color: "gray.500",
  },
  {
    field: "role",
    headerName: "VAI TRÒ",
    width: 100,
    color: "gray.500",
  },
  {
    field: "contactLocation",
    headerName: "ĐỊA CHỈ LIÊN HỆ",
    width: 200,
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
    contactLocation: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT01",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Admin",
    contactLocation: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT01",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Thanh tra viên",
    contactLocation: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT01",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Admin",
    contactLocation: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT01",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Thanh tra viên",
    contactLocation: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT01",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Thanh tra viên",
    contactLocation: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT01",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Admin",
    contactLocation: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT01",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Admin",
    contactLocation: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
  {
    id: "TT01",
    firstJoinDate: "03/03/2021",
    name: "Nguyễn Lê Anh Minh",
    email: "anhminh2122000@gmail.com",
    phone: "0946672181",
    role: "Admin",
    contactLocation: "105 Điện Biên Phủ, Hải Châu, Đà Nẵng",
  },
];

function UserDataGrid() {
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setTimeout(() => setData(fakeData), 1000);
  }, []);

  return (
    <TableContainer component={Paper} elevation={2} sx={{ marginTop: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((column) => (
              <TableCell width={column.width} component={Typography} variant="regular" color="gray.500">
                {column.headerName}
              </TableCell>
            ))}

            <TableCell width={80} />
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row) => (
            <TableRow>
              {headers.map((header) => (
                <TableCell component={Typography} variant="regular" color={header.color}>
                  {row[header.field]}
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

          {data.length == 0 &&
            Array.from(Array(5)).map(() => (
              <TableRow>
                {headers.map(() => (
                  <TableCell>
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
            ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              rowsPerPage={rowsPerPage}
              page={page}
              count={data.length}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value))}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default UserDataGrid;
