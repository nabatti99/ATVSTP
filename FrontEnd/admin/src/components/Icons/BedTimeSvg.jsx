import { Stack, SvgIcon } from "@mui/material";

function BedTimeSvg({ color = "inherit", size = 24, ...props }) {
  return (
    <Stack {...props} color={color} width={size} height={size} justifyContent="center" alignItems="center">
      <SvgIcon sx={{ fontSize: size }} viewBox="0 0 24 24">
        <path d="M9.27 4.49001C7.64 12.03 13.02 16.9 16.93 18.29C15.54 19.38 13.81 20 12 20C7.59 20 4 16.41 4 12C4 8.55001 6.2 5.60001 9.27 4.49001ZM11.99 2.01001C6.4 2.01001 2 6.54001 2 12C2 17.52 6.48 22 12 22C15.71 22 18.93 19.98 20.66 16.98C13.15 16.73 8.57 8.55001 12.34 2.01001C12.22 2.01001 12.11 2.01001 11.99 2.01001Z" />
      </SvgIcon>
    </Stack>
  );
}

export default BedTimeSvg;