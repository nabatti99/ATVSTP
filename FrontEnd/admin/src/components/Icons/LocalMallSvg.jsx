import { Stack, SvgIcon } from "@mui/material";

function LocalMallSvg({ color = "inherit", size = 24, ...props }) {
  return (
    <Stack {...props} color={color} width={size} height={size} justifyContent="center" alignItems="center">
      <SvgIcon sx={{ fontSize: size }} viewBox="0 0 24 24">
        <path d="M19 6H17C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6H5C3.9 6 3 6.9 3 8V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V8C21 6.9 20.1 6 19 6ZM12 3C13.66 3 15 4.34 15 6H9C9 4.34 10.34 3 12 3ZM19 20H5V8H19V20ZM12 12C10.34 12 9 10.66 9 9H7C7 11.76 9.24 14 12 14C14.76 14 17 11.76 17 9H15C15 10.66 13.66 12 12 12Z" />
      </SvgIcon>
    </Stack>
  );
}

export default LocalMallSvg;
