import { Stack, SvgIcon } from "@mui/material";

function CloseSvg({ color = "inherit", size = 24, ...props }) {
  return (
    <Stack {...props} color={color} width={size} height={size} justifyContent="center" alignItems="center">
      <SvgIcon sx={{ fontSize: size }} viewBox="0 0 16 16">
        <path d="M12.6663 4.27325L11.7263 3.33325L7.99968 7.05992L4.27301 3.33325L3.33301 4.27325L7.05968 7.99992L3.33301 11.7266L4.27301 12.6666L7.99968 8.93992L11.7263 12.6666L12.6663 11.7266L8.93968 7.99992L12.6663 4.27325Z" />
      </SvgIcon>
    </Stack>
  );
}

export default CloseSvg;
