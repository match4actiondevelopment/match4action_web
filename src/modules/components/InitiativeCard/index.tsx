"use client";

import { lato } from "@/modules/styles/fonts";
import { InitiativeInterface } from "@/modules/types/types";
import { isValidUrl } from "@/modules/utils";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import NextImage from "next/image";
import NextLink from "next/link";
import { useState } from "react";

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
  const imageUrl = image && isValidUrl(image[0]) ? image[0] : null;
  return (
    <Card
      elevation={0}
      sx={{
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "4px",
        display: "flex",
        position: "relative",
        padding: "1rem 0.5rem",
        background: "#fff",
      }}
    >
      <Box
        height={61}
        width={61}
        sx={{
          background: imageUrl ? "none" : "#EAEAEA",
          marginRight: "0.75rem",
          position: "relative",
        }}
      >
        {imageUrl ? (
          <NextImage src={imageUrl} alt={initiativeName} fill />
        ) : null}
      </Box>
      <Box>
        <Typography
          className={lato.className}
          fontWeight={400}
          textTransform="capitalize"
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              fontSize: "0.8rem",
              lineHeight: "1rem",
              color: theme.palette.text.primary,
              marginBottom: "2px",
            },
          })}
        >
          {initiativeName}
        </Typography>
        <Typography
          className={lato.className}
          fontWeight={700}
          textTransform="capitalize"
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              fontSize: "1rem",
              lineHeight: "1.25rem",
              color: theme.palette.text.primary,
              marginBottom: "2px",
            },
          })}
        >
          {servicesNeeded?.map((item) => `${item}, `)}
        </Typography>
        <Typography
          className={lato.className}
          fontWeight={300}
          textTransform="capitalize"
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              fontSize: "0.75rem",
              lineHeight: "0.875rem",
              color: theme.palette.text.primary,
            },
          })}
        >
          {location?.city && location?.country
            ? `${location?.city}, ${location?.country}`
            : location?.city}
        </Typography>
      </Box>
      <NextLink
        href={`/initiatives/${_id}`}
        style={{
          textDecoration: "none",
          position: "absolute",
          bottom: 0,
          right: 0,
          margin: "1rem 0.5rem",
        }}
      >
        <Button
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#FFD15C",
              color: theme.palette.text.primary,
              fontWeight: 400,
              fontSize: "0.75rem",
              ":focus": {
                background: "#FFD15C",
              },
              ":active": {
                background: "#FFD15C",
              },
              ":hover": {
                background: "#FFD15C",
              },
              ":disabled": {
                background: "#D3D3D3",
                boxShadow: "none",
              },
              textTransform: "capitalize",
              textDecoration: "none",
              borderRadius: "5px",
              cursor: "pointer",
              boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
            },
            [theme.breakpoints.up("sm")]: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#FFD15C",
              color: theme.palette.text.primary,
              fontWeight: 400,
              boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
              fontSize: "0.75rem",
              ":focus": {
                background: "#FFD15C",
              },
              ":active": {
                background: "#FFD15C",
              },
              ":hover": {
                background: "#FFD15C",
              },
              ":disabled": {
                background: "#D3D3D3",
                boxShadow: "none",
              },
              textTransform: "capitalize",
              textDecoration: "none",
              borderRadius: "5px",
              cursor: "pointer",
            },
          })}
        >
          Apply
        </Button>
      </NextLink>
      <IconButton
        onClick={() => setIsFavorite(!isFavorite)}
        sx={{
          background: "transparent",
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        {isFavorite ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
      </IconButton>
    </Card>
  );
};
