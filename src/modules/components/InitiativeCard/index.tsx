"use client";
import { Box, Button, Card, Typography } from "@mui/material";
import { InitiativeInterface } from "@/modules/types/types";
import SafeImage from "../SafeImage";
import {
  detailHref,
  rememberListPosition,
} from "@/modules/utils/listNavigation";
export const InitiativeCard = ({
  initiativeName,
  location,
  servicesNeeded,
  image,
  _id,
}: Pick<
  InitiativeInterface,
  "initiativeName" | "location" | "servicesNeeded" | "_id" | "image"
>) => (
  <Card
    sx={{
      p: 2,
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 2,
      width: "100%",
    }}
  >
    <Box sx={{ width: 72, height: 72, flexShrink: 0 }}>
      <SafeImage src={image?.[0]} alt={initiativeName} />
    </Box>
    <Box sx={{ flex: 1, minWidth: 160 }}>
      <Typography variant="h6">{initiativeName}</Typography>
      <Typography>{servicesNeeded?.join(", ")}</Typography>
      <Typography color="text.secondary">
        {[location?.city, location?.country].filter(Boolean).join(", ") ||
          "Location not provided"}
      </Typography>
    </Box>
    <Button
      disabled={!_id}
      onClick={() => {
        if (_id) {
          rememberListPosition();
          window.location.assign(detailHref(_id));
        }
      }}
    >
      View details
    </Button>
  </Card>
);