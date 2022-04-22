import { Stack, SvgIcon } from "@mui/material";

function FlagSvg({ color = "inherit", size = 24, ...props }) {
  return (
    <Stack {...props} color={color} width={size} height={size} justifyContent="center" alignItems="center">
      <SvgIcon sx={{ fontSize: size }} viewBox="0 0 16 16">
        <path d="M8.23967 3.99996L8.50634 5.33329H11.9997V9.33329H9.75968L9.49301 7.99996H4.66634V3.99996H8.23967ZM9.33301 2.66663H3.33301V14H4.66634V9.33329H8.39967L8.66634 10.6666H13.333V3.99996H9.59967L9.33301 2.66663Z" />
      </SvgIcon>
    </Stack>
  );
}

export default FlagSvg;
