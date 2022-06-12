import { Stack, SvgIcon } from "@mui/material";

function ArrowForwardSvg({ color = "inherit", size = 24, ...props }) {
  return (
    <Stack {...props} color={color} width={size} height={size} justifyContent="center" alignItems="center">
      <SvgIcon sx={{ fontSize: size }} viewBox="0 0 24 24">
        <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
      </SvgIcon>
    </Stack>
  );
}

export default ArrowForwardSvg;
