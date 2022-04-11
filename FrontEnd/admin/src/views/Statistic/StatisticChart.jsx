import { Box, MenuItem, Paper, Stack, TextField, Typography, useTheme } from "@mui/material";
import { Chart } from "chart.js";
import { useEffect, useRef } from "react";

function StatisticChart({ ...sx }) {
  const canvasRef = useRef();
  const chartRef = useRef();

  const theme = useTheme();

  useEffect(() => {
    // chartRef.current = new Chart(canvasRef.current, {
    //   type: "bar",
    //   data: {
    //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //     datasets: [
    //       {
    //         label: "# of Votes",
    //         data: [12, 19, 3, 5, 2, 3],
    //         backgroundColor: [
    //           "rgba(255, 99, 132, 0.2)",
    //           "rgba(54, 162, 235, 0.2)",
    //           "rgba(255, 206, 86, 0.2)",
    //           "rgba(75, 192, 192, 0.2)",
    //           "rgba(153, 102, 255, 0.2)",
    //           "rgba(255, 159, 64, 0.2)",
    //         ],
    //         borderColor: [
    //           "rgba(255, 99, 132, 1)",
    //           "rgba(54, 162, 235, 1)",
    //           "rgba(255, 206, 86, 1)",
    //           "rgba(75, 192, 192, 1)",
    //           "rgba(153, 102, 255, 1)",
    //           "rgba(255, 159, 64, 1)",
    //         ],
    //         borderWidth: 1,
    //       },
    //     ],
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //       },
    //     },
    //   },
    // });
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        ...sx,
      }}
    >
      <Stack paddingY={2} paddingX={2}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center">
            <Typography variant="h5" mr={1} color="gray.700">
              Thống kê
            </Typography>
            <TextField select variant="standard" value="All">
              <MenuItem value="All">Tất cả</MenuItem>
              <MenuItem value="NumGroceries">Số lượng Cửa hàng Thực phẩm</MenuItem>
              <MenuItem value="NumVerifiedGroceries">Số lượng CHTP đã có chứng nhận ATVSTP</MenuItem>
              <MenuItem value="NumNotVerifiedGroceries">Số lượng CHTP chưa có chứng nhận ATVSTP</MenuItem>
            </TextField>
          </Stack>

          <Typography variant="h5" color="gray.500">
            Hiển thị...
          </Typography>
        </Stack>

        <Box component="canvas" ref={canvasRef} />
      </Stack>
    </Paper>
  );
}

export default StatisticChart;
