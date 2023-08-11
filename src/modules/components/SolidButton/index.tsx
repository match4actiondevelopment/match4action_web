import { lato } from "@/modules/styles/fonts";
import Box, { BoxProps } from "@mui/material/Box";
import { ReactNode } from "react";

interface SolidButtonProps{
    children: ReactNode; 
    buttonProps?: BoxProps;
}

export const SolidButton = ({ children, buttonProps }: SolidButtonProps) => {
    
  
  return (
    
      <Box
        className={lato.className}
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "39px",
            background: "#FFD15C",
            color: theme.palette.text.primary,
            fontWeight: 600,
            fontSize: "1rem",
            ":focus": {
              background: "#FFD15C",
            },
            ":active": {
              background: "#FFD15C",
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
            padding: "14px 28px",
            background: "#FFD15C",
            color: theme.palette.text.primary,
            fontWeight: 600,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
            fontSize: "1rem",
            ":focus": {
              background: "#FFD15C",
            },
            ":active": {
              background: "#FFD15C",
            },
            textTransform: "capitalize",
            textDecoration: "none",
            borderRadius: "5px",
            marginBottom: "1rem",
            cursor: "pointer",
            marginRight: "1rem",
          },
        })} {...buttonProps} >
         
        {children}
      </Box>
    
  );
};
