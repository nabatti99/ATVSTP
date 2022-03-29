import { Stack, SvgIcon } from "@mui/material";

function LocationPinSvg({ color = "inherit", size = 24, ...props }) {
  return (
    <Stack {...props} color={color} width={size} height={size} justifyContent="center" alignItems="center">
      <SvgIcon sx={{ fontSize: size }} viewBox="0 0 24 24">
        <path d="M7.99992 1.33331C5.41992 1.33331 3.33325 3.41998 3.33325 5.99998C3.33325 7.15998 3.66659 8.24665 4.27325 9.22665C4.90659 10.2533 5.73992 11.1333 6.37992 12.16C6.69325 12.66 6.91992 13.1266 7.15992 13.6666C7.33325 14.0333 7.47325 14.6666 7.99992 14.6666C8.52659 14.6666 8.66659 14.0333 8.83325 13.6666C9.07992 13.1266 9.29992 12.66 9.61325 12.16C10.2533 11.14 11.0866 10.26 11.7199 9.22665C12.3333 8.24665 12.6666 7.15998 12.6666 5.99998C12.6666 3.41998 10.5799 1.33331 7.99992 1.33331ZM7.99992 7.83331C7.07992 7.83331 6.33325 7.08665 6.33325 6.16665C6.33325 5.24665 7.07992 4.49998 7.99992 4.49998C8.91992 4.49998 9.66659 5.24665 9.66659 6.16665C9.66659 7.08665 8.91992 7.83331 7.99992 7.83331Z" />
      </SvgIcon>
    </Stack>
  );
}

export default LocationPinSvg;
