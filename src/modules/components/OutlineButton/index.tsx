import { lato } from "@/modules/styles/fonts";
import Box, { BoxProps } from "@mui/material/Box";
import { ReactNode } from "react";

interface OutlineButtonProps {
  children: ReactNode;
  buttonProps?: BoxProps;
}

export const OutlineButton = ({ children, buttonProps }: OutlineButtonProps) => {
  return (
    <Box
      className={lato.className}
      sx={(theme) => ({
        [theme.breakpoints.down("sm")]: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40px",
          background: "#ffffff",
          color: theme.palette.text.primary,
          fontWeight: 600,
          fontSize: "1rem",
          border: "3px solid #FFD15C",
          ":focus": {
            background: "#ffffff",
            border: "3px solid #FFD15C",
          },
          ":active": {
            background: "#ffffff",
            border: "3px solid #FFD15C",
          },
          textTransform: "capitalize",
          textDecoration: "none",
          minWidth: "100%",
          borderRadius: "5px",
          marginBottom: "1rem",
          cursor: "pointer",
        },
        [theme.breakpoints.up("sm")]: {
          display: "inline-block",
          padding: "12px 28px",
          background: "#ffffff",
          color: theme.palette.text.primary,
          fontWeight: 600,
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
          fontSize: "1rem",
          border: "3px solid #FFD15C",
          ":focus": {
            background: "#ffffff",
            border: "3px solid #FFD15C",
          },
          ":active": {
            background: "#ffffff",
            border: "3px solid #FFD15C",
          },
          textTransform: "capitalize",
          textDecoration: "none",
          borderRadius: "5px",
          marginBottom: "1rem",
          cursor: "pointer",
        },
      })}
      {...buttonProps}>
      {children}
    </Box>
  );
};