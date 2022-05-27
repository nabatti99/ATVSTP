import { Box, Paper, useTheme } from "@mui/material";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
import { makeDataset } from "utilities/chartHelper";
import useRequest from "hooks/useRequest";

function StatisticChart({ ...sx }) {
  const canvasRef = useRef();

  const theme = useTheme();
  const request = useRequest();

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    const chart = new Chart(context, {
      type: "line",
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

    chart.render();

    request.get("grocery/count").then(({ data }) => {
      const { General, Have_cer, Not_have_cer, Time } = data.Result;
      chart.data.labels = Time;
      chart.data.datasets = [
        makeDataset(General, "Tổng số cửa hàng", theme.palette.blue[500]),
        makeDataset(Have_cer, "Cửa hàng đã được cấp giấy chứng nhận", theme.palette.green[500]),
        makeDataset(Not_have_cer, "Cửa hàng chưa được cấp giấy chứng nhận", theme.palette.red[500]),
      ];
      chart.update();
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
