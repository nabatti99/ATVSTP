import { Stack, SvgIcon } from "@mui/material";

function CorporateFareSvg({ color = "inherit", size = 24, ...props }) {
  return (
    <Stack {...props} color={color} width={size} height={size} justifyContent="center" alignItems="center">
      <SvgIcon sx={{ fontSize: size }} viewBox="0 0 24 24">
        <path d="M25.9997 15.1667V6.5H4.33301V45.5H47.6663V15.1667H25.9997ZM21.6663 41.1667H8.66634V36.8333H21.6663V41.1667ZM21.6663 32.5H8.66634V28.1667H21.6663V32.5ZM21.6663 23.8333H8.66634V19.5H21.6663V23.8333ZM21.6663 15.1667H8.66634V10.8333H21.6663V15.1667ZM43.333 41.1667H25.9997V19.5H43.333V41.1667ZM38.9997 23.8333H30.333V28.1667H38.9997V23.8333ZM38.9997 32.5H30.333V36.8333H38.9997V32.5Z" />
      </SvgIcon>
    </Stack>
  );
}

export default CorporateFareSvg;
