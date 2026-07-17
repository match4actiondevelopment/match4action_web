"use client";

import { lato } from "@/modules/styles/fonts";
import { InitiativeInterface } from "@/modules/types/types";
import { isValidUrl } from "@/modules/utils";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import NextImage from "next/image";
import NextLink from "next/link";
import { useState, useContext } from "react";
import { UserContext } from "@/modules/context/user-context";

export const InitiativeCard = ({
  initiativeName,
  location,
  servicesNeeded,
  image,
  _id,
}: Pick<
  InitiativeInterface,
  "initiativeName" | "location" | "servicesNeeded" | "_id" | "image"
>) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { isLogged } = useContext(UserContext) ?? {};
  const imageUrl = image && isValidUrl(image[0]) ? image[0] : null;

  const handleApplyClick = () => {
    if (!isLogged) {
      // Redirect to login page if not authenticated
      window.location.href = '/login';
      return;
    }
    // If authenticated, navigate to the initiative detail page
    window.location.href = `/initiatives/${_id}`;
  };

  return (
    <Card
      elevation={0}
      sx={{
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.12)",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        padding: "0.5rem",
        background: "#fff",
        minHeight: 110,
        width: "100%",
        height: "100%",
        "@media only screen and (max-width:1500px)": {
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        },
      }}
    >
      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start", flex: 1 }}>
        <Box
          height={61}
          width={61}
          sx={{
            background: imageUrl ? "none" : "#EAEAEA",
            position: "relative",
            flexShrink: 0,
          }}
        >
          {imageUrl ? <NextImage src={imageUrl} alt={initiativeName} fill /> : null}
        </Box>
        <Box
          sx={{
            minWidth: 0,
            flex: 1,
            "@media only screen and (max-width:1500px)": {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            },
          }}
        >
          <Typography
            className={lato.className}
            fontWeight={700}
            sx={(theme) => ({
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              maxWidth: "100%",
              [theme.breakpoints.down("sm")]: {
                fontSize: "0.95rem",
                lineHeight: "1.2rem",
                marginBottom: "4px",
              },
            })}
          >
            {initiativeName}
          </Typography>
          <Typography
            className={lato.className}
            fontWeight={700}
            textTransform="capitalize"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {servicesNeeded?.join(", ")}
          </Typography>
          <Typography
            className={lato.className}
            fontWeight={300}
            textTransform="capitalize"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "text.secondary",
            }}
          >
            {location?.city && location?.country
              ? `${location?.city}, ${location?.country}`
              : location?.city}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          flexWrap: "wrap",
          "@media only screen and (max-width:1500px)": {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "auto",
            marginLeft: "8px",
          },
        })}
      >
        <IconButton onClick={() => setIsFavorite(!isFavorite)} sx={{ background: "transparent" }}>
          {isFavorite ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
        </IconButton>
        <Button
          onClick={handleApplyClick}
          sx={(theme) => ({
            minWidth: 88,
            px: 2,
            py: 1,
            background: "#FFD15C",
            color: theme.palette.text.primary,
            fontWeight: 600,
            fontSize: "0.8rem",
            borderRadius: "8px",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            [theme.breakpoints.down("sm")]: {
              minWidth: 56,
              px: 1.5,
            },
            "@media only screen and (max-width:1500px)": {
              minWidth: 64,
              px: 1,
            },
          })}
        >
          <SendIcon fontSize="small" />
          <Box component="span" sx={{ ml: 0.5, display: { xs: "none", sm: "inline" } }}>
            Apply
          </Box>
        </Button>
      </Box>
    </Card>
  );
};
