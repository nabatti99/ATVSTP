import { Stack, Typography, Box, Skeleton } from "@mui/material";

function Notification({ label = "", isLoading = false, children, ...props }) {
  return (
    <Stack direction="row" spacing={2} {...props}>
      <Box>
        {isLoading ? (
          <Skeleton variant="circular" width={52} height={52} animation="wave" />
        ) : (
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
        )}
      </Box>

      {children}
    </Stack>
  );
}

export default Notification;
