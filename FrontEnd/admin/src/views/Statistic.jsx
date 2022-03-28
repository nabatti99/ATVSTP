import { Box, Grid, Stack, Typography } from "@mui/material";
import LeaderBoardSvg from "../components/Icons/LeaderBoardSvg";

function Statistic() {
  return (
    <Box>
      <Typography variant="h4" color="gray.700">
        Tình hình chung
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Stack flexGrow={1} bgcolor="blue.300" color="white" justifyContent="center">
            <Stack direction="row" alignItems="center" justifyContent="center">
              <LeaderBoardSvg size={52} />
              <Typography variant="h1">14</Typography>
            </Stack>
            <Typography align="center">Cuộc thanh tra trong tháng</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Statistic;
