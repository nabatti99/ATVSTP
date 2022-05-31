import { Checkbox, FormControlLabel, Paper, Stack, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { exportDate, importDate } from "utilities/formatDate";

function SuperiorReportSearchBar({ query = {}, onChange = () => {} }) {
  return (
    <Paper elevation={2}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Stack direction="row" px={4} py={2} alignItems="center">
          <Typography color="gray.700" variant="regular" mr={2}>
            Tìm kiếm theo khoảng thời gian từ
          </Typography>
          <DatePicker
            label="THỜI GIAN BẮT ĐẦU"
            onChange={(value) => {
              onChange({ ...query, dateStart: exportDate(new Date(value)).slice(0, 10) });
            }}
            value={new Date(query.dateStart)}
            renderInput={(params) => <TextField sx={{ marginRight: 2 }} {...params} />}
          />
          <Typography color="gray.700" variant="regular" mr={2}>
            đến
          </Typography>
          <DatePicker
            label="THỜI GIAN KẾT THÚC"
            onChange={(value) => {
              onChange({ ...query, dateEnd: exportDate(new Date(value)).slice(0, 10) });
            }}
            value={new Date(query.dateEnd)}
            renderInput={(params) => <TextField sx={{ marginRight: 2 }} {...params} />}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={query.isDraft}
                onChange={(event) => onChange({ ...query, isDraft: event.target.checked })}
              />
            }
            label="Bản Nháp"
          />
        </Stack>
      </LocalizationProvider>
    </Paper>
  );
}

export default SuperiorReportSearchBar;
