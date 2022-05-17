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
            text: "Thống kê tình hình vệ sinh toàn thực phẩm",
            font: {
              size: theme.typography.h3.fontSize,
              family: theme.typography.h3.fontFamily,
              weight: theme.typography.h3.fontWeight,
            },
            color: theme.palette.gray[700],
          },
          tooltip: {
            bodyFont: {
              family: theme.typography.regular.fontFamily,
              size: theme.typography.regular.fontSize,
            },
            bodyColor: theme.palette.gray[500],
            backgroundColor: theme.palette.white,
          },
          legend: {
            labels: {
              font: {
                size: theme.typography.h5.fontSize,
                family: theme.typography.h5.fontFamily,
                weight: theme.typography.h5.fontWeight,
              },
            },
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
              text: "Thời gian",
              font: {
                size: theme.typography.strong.fontSize,
                family: theme.typography.strong.fontFamily,
                weight: theme.typography.strong.fontWeight,
              },
            },
            ticks: {
              font: {
                size: theme.typography.regular.fontSize,
                family: theme.typography.regular.fontFamily,
                weight: theme.typography.regular.fontWeight,
              },
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Cửa hàng",
              font: {
                size: theme.typography.strong.fontSize,
                family: theme.typography.strong.fontFamily,
                weight: theme.typography.strong.fontWeight,
              },
            },
            ticks: {
              callback: function (value) {
                if (value % 1 === 0) {
                  return value;
                }
              },
              font: {
                size: theme.typography.regular.fontSize,
                family: theme.typography.regular.fontFamily,
                weight: theme.typography.regular.fontWeight,
              },
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
      <Box component="canvas" ref={canvasRef} />
    </Paper>
  );
}

export default StatisticChart;
