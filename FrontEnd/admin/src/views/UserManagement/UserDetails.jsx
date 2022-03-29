import { Box, Paper, Stack, Typography } from "@mui/material";
import ButtonIcon from "../../components/ButtonIcon";
import LeaderBoardSvg from "../../components/Icons/LeaderBoardSvg";
import Image from "../../components/Image";

function UserDetails() {
  return (
    <Stack>
      <Typography variant="h4" color="gray.700">
        Thông tin cá nhân
      </Typography>

      <Paper elevation={2} sx={{ padding: 4, marginTop: 4 }}>
        <Stack direction="row">
          <Stack flexGrow={1}>
            <Stack direction="row">
              <Image src="https://i.pravatar.cc/200" width={160} height={160} mr={4} />
              <Stack mt={2}>
                <Typography variant="h4">Nguyễn Lê Anh Minh</Typography>
                <Box width={100} height={2} bgcolor="gray.500" mt={2} />

                <Stack direction="row" color="gray.500" alignItems="center" mt={1}>
                  <LeaderBoardSvg size={16} mr={1} />
                  <Typography variant="strong">anhminh2122000@gmail.com</Typography>
                </Stack>

                <Stack direction="row" color="gray.500" alignItems="center" mt={1}>
                  <LeaderBoardSvg size={16} mr={1} />
                  <Typography variant="strong">094-667-2181</Typography>
                </Stack>

                <Typography variant="strong" color="red.500" mt={1}>
                  Admin
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="center" color="gray.500" mt={2}>
              <LeaderBoardSvg size={16} mr={1} />
              <Typography variant="strong">105 Điện Biên Phủ, Hải Châu, Đà Nẵng</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" color="gray.500" mt={1}>
              <LeaderBoardSvg size={16} mr={1} />
              <Typography variant="strong">Là thành viên từ ngày: 03/03/2021</Typography>
            </Stack>
          </Stack>

          <Stack>
            <ButtonIcon variant="contained" LeftIcon={LeaderBoardSvg} onClick={() => {}} sx={{ marginBottom: 2 }}>
              Chỉnh sửa
            </ButtonIcon>
            <ButtonIcon variant="contained" color="red" LeftIcon={LeaderBoardSvg} onClick={() => {}}>
              Xoá
            </ButtonIcon>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default UserDetails;
