import { useEffect, useState } from "react";
import { Stack, Typography, Grid, Tabs, Tab, Paper, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import PrivateTab from "./PrivateNotification/PrivateTab";
import FeedbackTab from "./FeedbackNotification/FeedbackTab";

const privateTab = {
  index: 0,
  id: "privateTab",
  name: "NỘI BỘ",
};
const feedbackTab = {
  index: 1,
  id: "feedbackTab",
  name: "NGƯỜI DÂN",
};

function NotificationsManagement() {
  const [tabIndex, setTabValue] = useState(privateTab.index);

  return (
    <Stack>
      <Typography variant="h4" color="gray.700" mb={4}>
        Quản lí thông báo, phản hồi
      </Typography>

      <Paper elevation={2} sx={{ borderRadius: 4 }}>
        <Grid container>
          <Grid
            item
            xs={3}
            bgcolor="blue.50"
            borderRight={1}
            borderColor="gray.300"
            height="80vh"
            overflow="auto"
            className="scrollbar"
          >
            <Stack height="100%">
              <Tabs
                variant="fullWidth"
                value={tabIndex}
                onChange={(event, tabIndex) => setTabValue(tabIndex)}
                sx={{
                  borderBottom: 1,
                  borderColor: "gray.300",
                }}
              >
                <Tab label={privateTab.name} id={privateTab.id} />
                <Tab label={feedbackTab.name} id={feedbackTab.id} />
              </Tabs>

              <PrivateTab isShown={tabIndex == privateTab.index} />
              <FeedbackTab isShown={tabIndex == feedbackTab.index} />
            </Stack>
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
