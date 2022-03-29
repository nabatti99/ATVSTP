import { Box, Button } from "@mui/material";

function ButtonIcon({ variant = "outlined", color = "blue", onClick, LeftIcon, children, ...props }) {
  return (
    <Button variant={variant} onClick={onClick} color={color} {...props}>
      {LeftIcon && (
        <Box component="span" mr={1}>
          <LeftIcon size={16} />
        </Box>
      )}
      {children}
    </Button>
  );
}

export default ButtonIcon;
