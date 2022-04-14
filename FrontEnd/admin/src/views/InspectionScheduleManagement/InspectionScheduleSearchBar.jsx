import { Paper, Stack, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function InspectionScheduleSearchBar({ onChange }) {
  return (
    <Paper elevation={2}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Stack direction="row" px={4} py={2} alignItems="center">
          <Typography color="gray.700" variant="regular" mr={2}>
            Tìm kiếm theo khoảng thời gian từ
          </Typography>
          <DatePicker
            label="THỜI GIAN BẮT ĐẦU"
            onChange={(value) => {}}
            renderInput={(params) => <TextField sx={{ marginRight: 2 }} {...params} />}
          />
          <Typography color="gray.700" variant="regular" mr={2}>
            đến
          </Typography>
          <DatePicker
            label="THỜI GIAN KẾT THÚC"
            onChange={(value) => {}}
            renderInput={(params) => <TextField sx={{ marginRight: 2 }} {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </Paper>
  );
}

export default InspectionScheduleSearchBar;
