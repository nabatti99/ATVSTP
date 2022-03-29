import { Stack, SvgIcon } from "@mui/material";

function SendSvg({ color = "inherit", size = 24, ...props }) {
  return (
    <Stack {...props} color={color} width={size} height={size} justifyContent="center" alignItems="center">
      <SvgIcon sx={{ fontSize: size }} viewBox="0 0 24 24">
        <path d="M2.67301 4.02L7.67968 6.16667L2.66634 5.5L2.67301 4.02ZM7.67301 9.83333L2.66634 11.98V10.5L7.67301 9.83333ZM1.33967 2L1.33301 6.66667L11.333 8L1.33301 9.33333L1.33967 14L15.333 8L1.33967 2Z" />
      </SvgIcon>
    </Stack>
  );
}

export default SendSvg;
