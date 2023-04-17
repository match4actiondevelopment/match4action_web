"use client";

import { useGetInitiative } from "@/modules/hooks/useGetInitiative";
import { lato } from "@/modules/styles/fonts";
import { Goal } from "@/modules/types/types";
import { formatEntryDate } from "@/modules/utils";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NextImage from "next/image";

export default function VolunteerPost({ params }: { params: { id: string } }) {
  const { data } = useGetInitiative(params.id);

  return (
    <Box
      component="main"
      marginTop="1.5rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="0 1rem"
      height="100%"
      position="relative"
    >
      <Box
        sx={(theme) => ({
          width: "100%",
          [theme.breakpoints.down("sm")]: {},
          [theme.breakpoints.up("sm")]: {
            maxWidth: "600px",
          },
        })}
      >
        {data?.image?.map((image, index) => (
          <Box
            key={image}
            sx={{ width: "100%", height: "240px", position: "relative" }}
          >
            <NextImage
              alt={`${data?.initiativeName} ${index} image`}
              src={image}
              fill
            />
          </Box>
        ))}
      </Box>
      <Typography
        className={lato.className}
        fontWeight="700"
        sx={(theme) => ({
          width: "100%",
          textAlign: "right",
          letterSpacing: "-0.015em",
          color: theme.palette.text.primary,
          lineHeight: "14px",
          fontWeight: 300,
          marginTop: "0.5rem",
          [theme.breakpoints.down("sm")]: {
            fontSize: ".75rem",
          },
          [theme.breakpoints.up("sm")]: {
            fontSize: ".75rem",
            maxWidth: "600px",
          },
        })}
      >
        Date Posted: {formatEntryDate(data?.createdAt)}
      </Typography>
      <Typography
        className={lato.className}
        fontWeight="700"
        sx={(theme) => ({
          width: "100%",
          textAlign: "left",
          color: theme.palette.text.primary,
          marginTop: "2rem",
          lineHeight: "24px",
          [theme.breakpoints.down("sm")]: {
            fontSize: "1.5rem",
          },
          [theme.breakpoints.up("sm")]: {
            fontSize: "1.5rem",
            maxWidth: "600px",
          },
        })}
      >
        {data?.initiativeName}
      </Typography>
      <Typography
        className={lato.className}
        sx={(theme) => ({
          width: "100%",
          textAlign: "left",
          color: theme.palette.text.primary,
          lineHeight: "20px",
          marginTop: ".2rem",
          [theme.breakpoints.down("sm")]: {
            fontSize: "1rem",
          },
          [theme.breakpoints.up("sm")]: {
            fontSize: "1rem",
            maxWidth: "600px",
          },
        })}
      >
        {data?.servicesNeeded?.map(
          (service, index) =>
            `${service}${
              data?.servicesNeeded?.length - 1 === index ? "" : ", "
            }`
        )}
      </Typography>
      <Typography
        className={lato.className}
        sx={(theme) => ({
          width: "100%",
          textAlign: "left",
          color: theme.palette.text.primary,
          lineHeight: "14px",
          marginTop: ".5rem",
          [theme.breakpoints.down("sm")]: {
            fontSize: "0.875rem",
          },
          [theme.breakpoints.up("sm")]: {
            fontSize: "0.875rem",
            maxWidth: "600px",
          },
        })}
      >
        {`Location: ${data?.location?.city} ${
          data?.location?.country ? `, ${data?.location?.country}` : null
        }`}
      </Typography>
      <Typography
        className={lato.className}
        sx={(theme) => ({
          width: "100%",
          textAlign: "left",
          marginTop: "1rem",
          color: theme.palette.text.primary,
          [theme.breakpoints.down("sm")]: {},
          [theme.breakpoints.up("sm")]: { maxWidth: "600px" },
        })}
      >
        {data?.description}
      </Typography>
      <Typography
        className={lato.className}
        sx={(theme) => ({
          width: "100%",
          textAlign: "center",
          marginTop: "2rem",
          marginBottom: "1rem",
          color: theme.palette.text.primary,
          [theme.breakpoints.down("sm")]: {},
          [theme.breakpoints.up("sm")]: { maxWidth: "600px" },
        })}
      >
        Global Goals attended by this cause
      </Typography>
      <Grid container spacing={{ xs: 2, md: 2 }} sx={{ maxWidth: "600px" }}>
        {data?.goals &&
          data?.goals?.length > 0 &&
          data?.goals?.map((item) => {
            const goal = item as Goal;
            return (
              <Grid item xs={4} sm={2} key={goal?._id}>
                <Button
                  sx={{
                    background: "#ececec",
                    width: "100%",
                    cursor: "pointer",
                    height: "151px",
                    fontSize: "0.5rem",
                    borderRadius: "none",
                  }}
                >
                  {goal?.image ? (
                    <NextImage alt={goal?.name} src={goal?.image} fill />
                  ) : (
                    goal?.name
                  )}
                </Button>
              </Grid>
            );
          })}
      </Grid>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            position: "fixed",
            bottom: "1rem",
            padding: "0 1rem",
          },
          [theme.breakpoints.up("sm")]: {
            maxWidth: "600px",
            marginTop: "1rem",
          },
        })}
      >
        <Grid item xs={6} sm={6}>
          <Button
            type="submit"
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
                ":hover": {
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "14px 28px",
                height: "56px",
                background: "#FFD15C",
                color: theme.palette.text.primary,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
                fontWeight: 600,
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
            Apply
          </Button>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Button
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
                marginBottom: "1.5rem",
                cursor: "pointer",
              },
              [theme.breakpoints.up("sm")]: {
                padding: "12px 28px",
                background: "#ffffff",
                color: theme.palette.text.primary,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
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
                ":hover": {
                  background: "#ffffff",
                },
                textTransform: "capitalize",
                textDecoration: "none",
                borderRadius: "5px",
                marginBottom: "1rem",
                cursor: "pointer",
                width: "100%",
                marginRight: "0",
              },
            })}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
