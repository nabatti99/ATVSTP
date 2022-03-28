import { Box, SvgIcon } from "@mui/material";

function LeaderBoardSvg({ color = "gray.700", size = 24, ...props }) {
  return (
    <Box {...props} color={color}>
      <SvgIcon sx={{ fontSize: size }} viewBox="0 0 24 24">
        <path d="M16 11V3H8V9H2V21H22V11H16ZM10 5H14V19H10V5ZM4 11H8V19H4V11ZM20 19H16V13H20V19Z" />
      </SvgIcon>
    </Box>
  );
}

export default LeaderBoardSvg;
