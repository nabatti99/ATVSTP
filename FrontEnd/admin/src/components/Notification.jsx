import { Stack, Typography, Box } from "@mui/material";

function Notification({ label = "", children, ...props }) {
  return (
    <Stack direction="row" spacing={2} {...props}>
      <Box>
        <Stack
          width={52}
          height={52}
          justifyContent="center"
          alignItems="center"
          bgcolor="blue.500"
          borderRadius="50%"
        >
          <Typography variant="regular" fontSize="1.5rem" color="white">
            {label}
          </Typography>
        </Stack>
      </Box>

      {children}
    </Stack>
  );
}

export default Notification;
