import { Stack, SvgIcon } from "@mui/material";

function MarkChatUnreadSvg({ color = "inherit", size = 24, ...props }) {
  return (
    <Stack {...props} color={color} width={size} height={size} justifyContent="center" alignItems="center">
      <SvgIcon sx={{ fontSize: size }} viewBox="0 0 24 24">
        <path d="M21 8.34545V16.5455C21 17.5455 20.19 18.3636 19.2 18.3636H6.6L3 22V5.63636C3 4.63636 3.81 3.81818 4.8 3.81818H13.89C13.836 4.10909 13.8 4.41818 13.8 4.72727C13.8 5.03636 13.836 5.34545 13.89 5.63636H4.8V16.5455H19.2V9.18182C19.866 9.04545 20.478 8.74545 21 8.34545ZM15.6 4.72727C15.6 6.23636 16.806 7.45455 18.3 7.45455C19.794 7.45455 21 6.23636 21 4.72727C21 3.21818 19.794 2 18.3 2C16.806 2 15.6 3.21818 15.6 4.72727Z" />
      </SvgIcon>
    </Stack>
  );
}

export default MarkChatUnreadSvg;
