import { Grid, Paper, Stack, Typography } from "@mui/material";
import useRequest from "hooks/useRequest";
import { useEffect, useState } from "react";
import { formatShortInt } from "utilities/formatNumber";
import AssignmentSvg from "../../components/Icons/AssignmentSvg";
import LeaderBoardSvg from "../../components/Icons/LeaderBoardSvg";
import MarkChatUnreadSvg from "../../components/Icons/MarkChatUnreadSvg";

function GeneralStatistic({ ...styles }) {
  const request = useRequest();

  const [numInspection, setNumInspection] = useState(0);
  const [numCertificate, setNumCertificate] = useState(0);
  const [numFeedback, setNumFeedback] = useState(0);

  const [numGroceries, setNumGroceries] = useState(0);
  const [numGroceriesWithCertificate, setNumGroceriesWithCertificate] = useState(0);
  const [numGroceriesWithoutCertificate, setNumGroceriesWithoutCertificate] = useState(0);

  useEffect(() => {
    request.get("general_situation/inspection_schedule").then(({ data }) => setNumInspection(data.Message));
    request.get("general_situation/certificate_atvstp").then(({ data }) => setNumCertificate(data.Message));
    request.get("general_situation/feedback_of_people").then(({ data }) => setNumFeedback(data.Message));

    request
      .get("grocery", {
        params: {
          offset: 0,
          limit: 9999,
          value: "",
        },
      })
      .then(({ data }) => {
        const groceries = data.result;
        const groceriesWithCertificate = data.result.filter((grocery) => grocery.certificate.length > 0);
        const groceriesWithoutCertificate = data.result.filter((grocery) => grocery.certificate.length == 0);

        setNumGroceries(groceries.length);
        setNumGroceriesWithCertificate(groceriesWithCertificate.length);
        setNumGroceriesWithoutCertificate(groceriesWithoutCertificate.length);
      });
  });

  return (
    <Grid container spacing={2} {...styles}>
      <Grid item xs={4}>
        <Paper elevation={2}>
          <Stack flexGrow={1} bgcolor="blue.300" color="white" justifyContent="center" py={4} borderRadius={2}>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <LeaderBoardSvg size={52} />
              <Typography variant="h1">{formatShortInt(numInspection, 2)}</Typography>
            </Stack>
            <Typography align="center">Cuộc thanh tra trong tháng</Typography>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper elevation={2}>
          <Stack flexGrow={1} bgcolor="green.500" color="white" justifyContent="center" py={4} borderRadius={2}>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <AssignmentSvg size={52} />
              <Typography variant="h1">{formatShortInt(numCertificate, 2)}</Typography>
            </Stack>
            <Typography align="center">Chứng nhận được cấp trong tháng</Typography>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper elevation={2}>
          <Stack flexGrow={1} bgcolor="red.500" color="white" justifyContent="center" py={4} borderRadius={2}>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <MarkChatUnreadSvg size={52} />
              <Typography variant="h1">{formatShortInt(numFeedback, 2)}</Typography>
            </Stack>
            <Typography align="center">Phản hồi từ người dân trong tháng</Typography>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper elevation={3}>
          <Stack flexGrow={1} bgcolor="white" justifyContent="center" py={2} borderRadius={2}>
            <Typography align="center" variant="h3" color="gray.700">
              {formatShortInt(numGroceries, 2)}
            </Typography>
            <Typography align="center" color="gray.500">
              Cửa hàng thực phẩm
            </Typography>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper elevation={3}>
          <Stack flexGrow={1} bgcolor="white" justifyContent="center" py={2} borderRadius={2}>
            <Typography align="center" variant="h3" color="green.700">
              {formatShortInt(numGroceriesWithCertificate, 2)}
            </Typography>
            <Typography align="center" color="green.500">
              Cửa hàng được cấp chứng nhận
            </Typography>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper elevation={3}>
          <Stack flexGrow={1} bgcolor="white" justifyContent="center" py={2} borderRadius={2}>
            <Typography align="center" variant="h3" color="red.700">
              {formatShortInt(numGroceriesWithoutCertificate, 2)}
            </Typography>
            <Typography align="center" color="red.500">
              Cửa hàng chưa được cấp chứng nhận
            </Typography>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default GeneralStatistic;
