import { Stack, SvgIcon } from "@mui/material";

function PhoneSvg({ color = "inherit", size = 24, ...props }) {
  return (
    <Stack {...props} color={color} width={size} height={size} justifyContent="center" alignItems="center">
      <SvgIcon sx={{ fontSize: size }} viewBox="0 0 16 16">
        <path d="M4.36 3.33333C4.4 3.92667 4.5 4.50667 4.66 5.06L3.86 5.86C3.58667 5.06 3.41333 4.21333 3.35333 3.33333H4.36ZM10.9333 11.3467C11.5 11.5067 12.08 11.6067 12.6667 11.6467V12.64C11.7867 12.58 10.94 12.4067 10.1333 12.14L10.9333 11.3467ZM5 2H2.66667C2.3 2 2 2.3 2 2.66667C2 8.92667 7.07333 14 13.3333 14C13.7 14 14 13.7 14 13.3333V11.0067C14 10.64 13.7 10.34 13.3333 10.34C12.5067 10.34 11.7 10.2067 10.9533 9.96C10.8867 9.93333 10.8133 9.92667 10.7467 9.92667C10.5733 9.92667 10.4067 9.99333 10.2733 10.12L8.80667 11.5867C6.92 10.62 5.37333 9.08 4.41333 7.19333L5.88 5.72667C6.06667 5.54 6.12 5.28 6.04667 5.04667C5.8 4.3 5.66667 3.5 5.66667 2.66667C5.66667 2.3 5.36667 2 5 2Z" />
      </SvgIcon>
    </Stack>
  );
}

export default PhoneSvg;
