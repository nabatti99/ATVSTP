import { Box, useTheme } from "@mui/material";

function Image({ src = null, borderRadius = 8, alt = "image", borderColor, ...props }) {
  const theme = useTheme();

  return (
    <Box {...props}>
      <img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          color: "transparent",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: borderColor || theme.palette.gray[600],
          borderRadius: 8,
          boxSizing: "border-box",
        }}
        alt={alt}
      />
    </Box>
  );
}
export default Image;
