"use client";

import { footerMenuCustomProps } from "@/modules/utils";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { List, ListItem, ListItemText, ListItemButton, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import NextImage from "next/image";
import NextLink from "next/link";
import { FooterBackground } from "@/modules/components/FooterBackground";

const FooterButton = dynamic(
  () => import("../FooterButton").then((doc) => doc.FooterButton),
  {
    ssr: false,
  }
);

export interface FooterDesktopInterface {
  accessToken?: string;
}

export const FooterDesktop = ({ accessToken }: FooterDesktopInterface) => {
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
      <Grid container spacing={0} sx={{
        marginTop: "10rem",
        marginLeft: "-5rem",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "5rem"
      }}>
        <FooterBackground />
        <Grid>
          <Box sx={{
            marginRight: "10rem",
            display: "flex",
            gap: "0.5rem"
          }}>
            <NextImage
              alt="logo match4purpose"
              src="/logo_grey.svg"
              width={19}
              height={23}
            />
            <span style={{ color: "#3F4350", fontWeight: 500 }}>
              match4purpose
            </span>
          </Box>
        </Grid>
        <Toolbar sx={{
          display: "flex",
          alignItems: "baseline",
          gap: "10rem"
        }}>
          <Grid>
            <NextLink href="/" style={{ textDecoration: "none" }}>
              <Typography
                component="div"
                sx={{
                  margin: 0,
                  padding: 0,
                  fontSize: "18px",
                  color: "#000000",
                  fontWeight: 700
                }}
              >
                Match4Purpose
              </Typography>
            </NextLink>
            <List
              sx={{
                marginTop: "0.75rem",
                fontSize: "16px"
              }}
            >
              {menu.map(menu => (
                <ListItem sx={{
                  padding: 0,
                  marginBottom: "-0.6rem"
                }}>
                  <NextLink href={menu.href} style={style}>
                    <ListItemText primary={menu.primary} />
                  </NextLink>
                </ListItem>
              )
              )}
              <ListItem
                sx={{
                  marginTop: "4rem",
                  padding: 0,
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "rgba(0, 0, 0, 0.8)"
                }}
              >
                @Copyright 2021
              </ListItem>
            </List>
          </Grid>
          <Grid>
            <List>
              <ListItem
                sx={{
                  // marginTop: "1.5rem",
                  padding: 0,
                  color: "#fff",
                  minWidth: "64px"
                }}
              >
                <FooterButton accessToken={accessToken} />
              </ListItem>
              <Toolbar
                sx={{
                  marginTop: "1rem",
                  display: "flex"
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
                          height={social.height} />
                      </ListItemButton>
                    </NextLink>
                  </ListItem>
                )
                )}
              </Toolbar>
            </List>
          </Grid>
        </Toolbar>
      </Grid>
    </>
  );
};
