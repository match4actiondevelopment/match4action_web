"use client";

import { footerMenuCustomProps } from "@/modules/utils";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const TemporaryDrawer = dynamic(
  () => import("../../Drawer").then((doc) => doc.TemporaryDrawer),
  {
    ssr: false,
  }
);

const FooterButton = dynamic(
  () => import("../../Footer/FooterButton").then((doc) => doc.FooterButton),
  {
    ssr: false,
  }
);

export interface FooterMobileInterface {
  accessToken?: string;
}

export const FooterMobile = ({ accessToken }: FooterMobileInterface) => {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const style = footerMenuCustomProps();
  const socials = [
    { href: "https://www.facebook.com/Match4ActionFoundation", alt: "facebook match4purpose", src: "/facebook.svg", width: 24, height: 24 },
    { href: "https://www.instagram.com/match4action/", alt: "instagram match4purpose", src: "/instagram.svg", width: 24, height: 24 },
    { href: "https://medium.com/@info_66495", alt: "medium match4purpose", src: "/medium.svg", width: 22, height: 17.5 },
  ]
  const menu = [
    { href: "/about-us", primary: "About Us" },
    { href: "/contact-us", primary: "Contact Us" },
    { href: "/initiatives", primary: "Site Map" },
  ]

  return (
    <>
      <Box sx={{
        margin: "3rem 1.5rem 0 1.5rem",
        borderTop: "1px solid #B4B4B4"
      }} />
      <AppBar
        position="static"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#FFFFFF",
          boxShadow: "none"
        }}
      >
        <NextLink href="/" style={{ textDecoration: "none" }}>
          <Typography
            component="div"
            sx={{
              marginTop: "1.5rem",
              fontSize: "12px",
              color: "#000000",
              fontWeight: 700
            }}
          >
            Match4Purpose
          </Typography>
        </NextLink>
        <List
          sx={(theme) => ({
            marginTop: "0.75rem",
            fontSize: "16px",
            gap: "0.75rem",
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
          {menu.map(menu => (
            <ListItem sx={{
              padding: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <NextLink href={menu.href} style={style}>
                <ListItemText primary={menu.primary} />
              </NextLink>
            </ListItem>
          )
          )}
          <ListItem
            sx={{
              marginTop: "1.5rem",
              padding: 0,
              color: "#fff",
              minWidth: "64px"
            }}
          >
            <FooterButton accessToken={accessToken} />
          </ListItem>
          <Toolbar
            sx={{
              marginTop: "0.5rem",
              display: "flex",
              gap: "-1rem"
            }}
          >
            {socials.map(social => (
              <ListItem>
                <NextLink href={social.href} target="_blank" style={style}>
                  <ListItemButton>
                    <NextImage
                      alt={social.alt}
                      src={social.src}
                      width={social.width}
                      height={social.height}
                    />
                  </ListItemButton>
                </NextLink>
              </ListItem>
            )
            )}
          </Toolbar>
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "2rem",
              padding: 0,
              fontSize: "12px",
              fontWeight: 700,
              color: "rgba(0, 0, 0, 0.8)"
            }}
          >
            @Copyright 2021
          </ListItem>
        </List>
      </AppBar>
      <TemporaryDrawer open={open} toggleDrawer={setOpen} />
    </>
  );
};
