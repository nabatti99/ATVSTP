import { useEffect, useState } from "react";
import { Stack, Typography, Grid, Tabs, Tab, Paper, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import NotificationTab from "./NotificationTab";

const fakeData = [
  {
    tab: "NỘI BỘ",
    notifications: [
      {
        id: "ldd",
        title: "Thông báo họp tuần 32",
        receivers: ["Minh", "Thịnh", "Huyền"],
        messages: [
          {
            from: "Lê Duy Dương",
            message: `Chào cả nhóm, tuần này mình sẽ họp ban lectus faucibus bibendum eget eget non facilisi sed. Quisque
            mauris cursus convallis ut consequat volutpat elit, enim. Egestas a bibendum condimentum ipsum sed
            volutpat sollicitudin et nunc. Nam nisi gravida amet, dolor porttitor tellus, urna, massa. Nunc non
            feugiat purus non lacus eget volutpat. Neque ac lacus sit volutpat praesent sit sagittis. Nam
            bibendum vel sapien aenean imperdiet malesuada. Turpis pretium ante neque, tortor facilisis faucibus
            magna. Purus cras tortor, lobortis imperdiet duis mi sagittis. Tincidunt mi, pulvinar diam in auctor
            lacus, nascetur et. Amet, nunc, in mi quis vulputate eu volutpat ut quis. Sit tellus nisl euismod
            arcu est amet. Et, amet, dictum arcu pellentesque nullam integer rutrum. Ac maecenas cras dui, turpis
            nulla. Egestas id leo gravida massa facilisi dapibus.`,
          },
          {
            from: "Minh",
            message: `Tôi đã hiểu`,
          },
        ],
      },
      {
        id: "adsoch",
        title: "Thông báo thanh tra",
        receivers: ["Minh"],
        messages: [
          {
            from: "Trương Công Nam",
            message: `Gửi Minh, tuần này có kế hoạch thanh tra tại Ac maecenas cras dui, turpis
            nulla. Egestas id leo gravida massa facilisi dapibus.`,
          },
          {
            from: "Minh",
            message: `Tôi đã hiểu`,
          },
        ],
      },
    ],
  },
  {
    tab: "NGƯỜI DÂN",
    notifications: [],
  },
];

function NotificationsManagement() {
  return (
    <Stack>
      <Typography variant="h4" color="gray.700" mb={4}>
        Quản lí thông báo, phản hồi
      </Typography>

      <Paper elevation={2} sx={{ borderRadius: 4 }}>
        <Grid container>
          <Grid item xs={3} bgcolor="blue.50" borderRight={1} borderColor="gray.300" height="80vh">
            <NotificationTab data={fakeData} />
          </Grid>

          <Grid item xs={9}>
            <Outlet />
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
}

export default NotificationsManagement;
