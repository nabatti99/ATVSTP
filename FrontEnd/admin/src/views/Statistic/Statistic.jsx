import { Box, Typography } from "@mui/material";
import { Chart } from "chart.js";
import GeneralStatistic from "./GeneralStatistic";
import StatisticChart from "./StatisticChart";

function Statistic() {
  return (
    <Box>
      <Typography variant="h4" color="gray.700">
        Tình hình chung
      </Typography>

      <GeneralStatistic mt={2} />

      <StatisticChart mt={2} />
    </Box>
  );
}

export default Statistic;
