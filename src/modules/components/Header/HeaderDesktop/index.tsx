"use client";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import NextImage from "next/image";
import NextLink from "next/link";

const HeaderButton = dynamic(
  () => import("../HeaderButton").then((doc) => doc.HeaderButton),
  {
    ssr: false,
  }
);

export interface HeaderDesktopInterface {
  accessToken?: string;
}

export const HeaderDesktop = ({ accessToken }: HeaderDesktopInterface) => {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1.5rem 2.5rem",
      }}
    >
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
      <Box
        component="nav"
        aria-label="main mailbox folders"
        padding={0}
        zIndex={1}
      >
        <List
          sx={(theme) => ({
            display: "flex",
            padding: 0,
            height: "40px",
            [theme.breakpoints.up(1130)]: {
              gap: "1.5rem",
            },
            [theme.breakpoints.up(1200)]: {
              gap: "2rem",
            },
            [theme.breakpoints.up(1280)]: {
              gap: "2.5rem",
            },
            [theme.breakpoints.up(1360)]: {
              gap: "3rem",
            },
            [theme.breakpoints.up(1480)]: {
              gap: "3.8rem",
            },
          })}
        >
          <ListItem sx={{ padding: 0, minInlineSize: "fit-content" }}>
            <NextLink
              href="#"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <ListItemText primary="Take Test" sx={{ padding: 0 }} />
            </NextLink>
          </ListItem>
          <ListItem sx={{ padding: 0, minInlineSize: "fit-content" }}>
            <NextLink
              href="#"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <ListItemText primary="Volunteer Now" sx={{ padding: 0 }} />
            </NextLink>
          </ListItem>
          <ListItem sx={{ padding: 0, minInlineSize: "fit-content" }}>
            <NextLink
              href="#"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <ListItemText primary="Blog" sx={{ padding: 0 }} />
            </NextLink>
          </ListItem>
          <ListItem sx={{ padding: 0, minInlineSize: "fit-content" }}>
            <NextLink
              href="#"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <ListItemText primary="About us" sx={{ padding: 0 }} />
            </NextLink>
          </ListItem>
          <ListItem sx={{ padding: 0, minInlineSize: "fit-content" }}>
            <NextLink
              href="#"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <ListItemText primary="Get in Touch" sx={{ padding: 0 }} />
            </NextLink>
          </ListItem>
          <ListItem
            sx={{
              padding: 0,
              minInlineSize: "fit-content",
              color: "#fff",
              minWidth: "64px",
            }}
          >
            <HeaderButton accessToken={accessToken} />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
