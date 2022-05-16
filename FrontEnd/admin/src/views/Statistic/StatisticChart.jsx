import { Box, MenuItem, Paper, Stack, TextField, Typography, useTheme } from "@mui/material";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
import { makeDataset } from "utilities/chartHelper";

function StatisticChart({ ...sx }) {
  const canvasRef = useRef();

  const theme = useTheme();

  useEffect(() => {
    const data = {
      labels: [1, 2, 3, 4, 5],
      datasets: [
        makeDataset([0, 2, 3, 3, 4, 5], "Tổng số cửa hàng", theme.palette.blue[500]),
        makeDataset([0, 1, 1, 2, 2, 5], "Cửa hàng đã được cấp giấy chứng nhận", theme.palette.green[500]),
        makeDataset([0, 1, 2, 1, 2, 0], "Cửa hàng chưa được cấp giấy chứng nhận", theme.palette.red[500]),
      ],
    };

    const context = canvasRef.current.getContext("2d");
    const chart = new Chart(context, {
      type: "line",
      data: data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Chart.js Line Chart - Cubic interpolation mode",
          },
          tooltip: {
            bodyFont: {
              family: theme.typography.regular.fontFamily,
              size: theme.typography.regular.fontSize,
            },
            bodyColor: theme.palette.gray[500],
            titleFont: {
              family: theme.typography.regular.fontFamily,
              size: theme.typography.regular.fontSize,
            },
            titleColor: theme.palette.gray[700],
            backgroundColor: theme.palette.white,
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Value",
            },
          },
        },
      },
    });
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
