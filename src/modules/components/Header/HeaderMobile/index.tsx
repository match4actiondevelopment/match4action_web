"use client";

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import NextImage from "next/image";
import NextLink from "next/link";
import { useState } from "react";

const TemporaryDrawer = dynamic(
  () => import("../../Drawer").then((doc) => doc.TemporaryDrawer),
  {
    ssr: false,
  }
);

const HeaderButton = dynamic(
  () => import("../../Header/HeaderButton").then((doc) => doc.HeaderButton),
  {
    ssr: false,
  }
);

export interface HeaderMobileInterface {
  accessToken?: string;
}

export const HeaderMobile = ({ accessToken }: HeaderMobileInterface) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "#FFFFFF",
          boxShadow: "none",
          borderBottom: "1px solid #EAEAEA",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            onClick={() => setOpen(true)}
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: "rgba(0, 0, 0, 0.6)" }}
          >
            <MenuIcon />
          </IconButton>
          <NextLink href="/" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <NextImage
                alt="logo match4purpose"
                src="/logo.png"
                width={19}
                height={22}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontSize: "12px",
                  background:
                    "linear-gradient(136.74deg, #B577E1 6.64%, #554BBD 69.76%)",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 500,
                  marginLeft: "8px",
                }}
              >
                match4purpose
              </Typography>
            </Box>
          </NextLink>
          <HeaderButton accessToken={accessToken} />
        </Toolbar>
      </AppBar>
      <TemporaryDrawer open={open} toggleDrawer={setOpen} />
    </>
  );
};
