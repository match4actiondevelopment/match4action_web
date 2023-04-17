"use client";

import { InitiativeCard } from "@/modules/components/InitiativeCard";
import { useGetInitiatives } from "@/modules/hooks/useGetInitiatives";
import SortIcon from "@mui/icons-material/Sort";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { lato } from "../styles/fonts";

export default function VolunteerInitiatives() {
  const [page, setPage] = useState(0);
  const {
    status,
    data: initiatives,
    error,
    isFetching,
    isPreviousData,
  } = useGetInitiatives();

  return (
    <Box
      component="main"
      marginTop="1.5rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={{ xs: "0 1rem 1rem", sm: "0 2rem 2rem", md: "0 2.5rem 2rem" }}
      height="100%"
    >
      <Box width="100%" display="flex" flexDirection="column" gap={2}>
        <TextField
          fullWidth
          label="Jobs titles, companies, keywords"
          variant="outlined"
          size="small"
        />
        <TextField fullWidth label="Location" variant="outlined" size="small" />

        <Box>
          <Switch inputProps={{ "aria-label": "Remote Work" }} defaultChecked />
          <Typography
            className={lato.className}
            component="span"
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                fontSize: "1rem",
                lineHeight: "1.25rem",
                color: theme.palette.text.primary,
              },
            })}
          >
            Remote Work
          </Typography>
        </Box>
      </Box>
      <Typography
        className={lato.className}
        width="100%"
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            fontSize: "1rem",
            lineHeight: "1.25rem",
            color: theme.palette.text.primary,
          },
        })}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus vel
        scelerisque integer nunc in elit pretium.
      </Typography>
      <Divider
        sx={{
          width: "100%",
          border: "1px solid #D4D4D480",
          margin: "1rem 0 0.5rem",
        }}
      />
      <Box width="100%">
        <IconButton>
          <SortIcon />
          <Typography
            className={lato.className}
            component="span"
            fontWeight={500}
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                fontSize: "0.75rem",
                lineHeight: "1.25rem",
                color: theme.palette.text.primary,
                marginLeft: "5px",
              },
            })}
          >
            Most Recent
          </Typography>
        </IconButton>
      </Box>
      <Divider
        sx={{
          width: "100%",
          border: "1px solid #D4D4D480",
          margin: "0.5rem 0 1rem",
        }}
      />
      <Grid
        container
        spacing={[2, 4]}
        marginBottom={{ sm: "1rem", md: "2rem" }}
      >
        {initiatives &&
          initiatives?.map((item) => (
            <Grid item xs={12} md={3} key={item._id}>
              <InitiativeCard {...item} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
