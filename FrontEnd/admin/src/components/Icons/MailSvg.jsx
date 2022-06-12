import { Stack, SvgIcon } from "@mui/material";

function MailSvg({ color = "inherit", size = 24, ...props }) {
  return (
    <Stack {...props} color={color} width={size} height={size} justifyContent="center" alignItems="center">
      <SvgIcon sx={{ fontSize: size }} viewBox="0 0 16 16">
        <path d="M14.6666 4.00002C14.6666 3.26669 14.0666 2.66669 13.3333 2.66669H2.66659C1.93325 2.66669 1.33325 3.26669 1.33325 4.00002V12C1.33325 12.7334 1.93325 13.3334 2.66659 13.3334H13.3333C14.0666 13.3334 14.6666 12.7334 14.6666 12V4.00002ZM13.3333 4.00002L7.99992 7.32669L2.66659 4.00002H13.3333ZM13.3333 12H2.66659V5.33335L7.99992 8.66669L13.3333 5.33335V12Z" />
      </SvgIcon>
    </Stack>
  );
}

export default MailSvg;
