import { Grid, Paper, Stack, Typography } from "@mui/material";
import AssignmentSvg from "../../components/Icons/AssignmentSvg";
import LeaderBoardSvg from "../../components/Icons/LeaderBoardSvg";
import MarkChatUnreadSvg from "../../components/Icons/MarkChatUnreadSvg";

function GeneralStatistic({ ...styles }) {
  return (
    <Grid container spacing={2} {...styles}>
      <Grid item xs={4}>
        <Paper elevation={2}>
          <Stack flexGrow={1} bgcolor="blue.300" color="white" justifyContent="center" py={4} borderRadius={2}>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <LeaderBoardSvg size={52} />
              <Typography variant="h1">14</Typography>
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
              <Typography variant="h1">08</Typography>
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
              <Typography variant="h1">12</Typography>
            </Stack>
            <Typography align="center">Phản hồi từ người dân trong tháng</Typography>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper elevation={3}>
          <Stack flexGrow={1} bgcolor="white" justifyContent="center" py={2} borderRadius={2}>
            <Typography align="center" variant="h3" color="gray.700">
              86
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
              40
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
              46
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
