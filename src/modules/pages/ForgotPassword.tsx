"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { lato, sourceSerifPro } from "../styles/fonts";

export default function ForgotPassword() {
  return (
    <Box
      component="main"
      marginTop="2.75rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="0 1rem"
      height="100%"
      sx={(theme) => ({
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
        [theme.breakpoints.up("sm")]: {
          width: "100%",
          maxWidth: "540px",
          margin: "2.75rem auto",
        },
      })}
    >
      <Typography
        className={sourceSerifPro.className}
        variant="h2"
        fontWeight={700}
        marginBottom="2rem"
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            fontSize: "1.5rem",
            lineHeight: "1.75rem",
            color: theme.palette.text.primary,
            textAlign: "center",
          },
          [theme.breakpoints.up("sm")]: {
            fontSize: "2.5rem",
            lineHeight: "2.5rem",
            color: theme.palette.text.primary,
          },
        })}
      >
        Forgot your password?
      </Typography>
      <Typography
        className={lato.className}
        marginBottom="1.5rem"
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            fontSize: "0.875rem",
            lineHeight: "1rem",
            color: theme.palette.text.primary,
            textAlign: "center",
          },
          [theme.breakpoints.up("sm")]: {
            fontSize: "1rem",
            lineHeight: "2.5rem",
            color: theme.palette.text.primary,
          },
        })}
      >
        No worries, it happens :) Please enter your email below and we will send
        you instructions on how to reset your password.
      </Typography>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        marginBottom="2.5rem"
      >
        <TextField fullWidth label="Email" variant="outlined" size="small" />
      </Box>
      <Button
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
            ":hover": {
              background: "#FFD15C",
            },
            textTransform: "capitalize",
            textDecoration: "none",
            borderRadius: "5px",
            marginBottom: "1rem",
            cursor: "pointer",
            width: "100%",
          },
        })}
      >
        Send instructions
      </Button>
    </Box>
  );
}
