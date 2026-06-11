"use client";

import { InitiativeCard } from "@/modules/components/InitiativeCard";
import { useGetInitiatives } from "@/modules/hooks/useGetInitiatives";
import SortIcon from "@mui/icons-material/Sort";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState, useMemo } from "react";
import { lato } from "../styles/fonts";

export default function VolunteerInitiatives() {
  const [visibleCount, setVisibleCount] = useState(5);
  const [locationFilter, setLocationFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  
  // Parse location filter - can be "City, Country" or just "City" or just "Country"
  const locationFilters = useMemo(() => {
    if (!locationFilter.trim()) {
      return undefined;
    }
    
    const parts = locationFilter.split(",").map((part) => part.trim());
    
    if (parts.length === 2) {
      // Format: "City, Country" - search both fields specifically
      return { city: parts[0], country: parts[1] };
    } else if (parts.length === 1) {
      // Single value - search in both city and country fields
      // Backend will handle this with $or query
      return { location: parts[0] };
    }
    
    return undefined;
  }, [locationFilter]);
  
  // Combine all filters
  const allFilters = useMemo(() => {
    return {
      ...locationFilters,
      ...(searchFilter.trim() ? { search: searchFilter.trim() } : {}),
    };
  }, [locationFilters, searchFilter]);
  
  const {
    status,
    data: initiatives,
    error,
    isFetching,
    isPreviousData,
  } = useGetInitiatives(allFilters);

  // Dev-only mock initiatives to allow visual checks when API is unavailable
  const mockInitiatives = [
    {
      _id: "mock-1",
      initiativeName: "Park Cleanup",
      location: { city: "Austin", country: "USA" },
      servicesNeeded: ["Cleanup", "Logistics"],
      image: [],
    },
    {
      _id: "mock-2",
      initiativeName: "Food Bank Support with a Longer Title to Test Truncation",
      location: { city: "Austin", country: "USA" },
      servicesNeeded: ["Food Prep", "Distribution", "Coordination"],
      image: [],
    },
    {
      _id: "mock-3",
      initiativeName: "Senior Center Visits",
      location: { city: "San Antonio", country: "USA" },
      servicesNeeded: ["Companionship"],
      image: [],
    },
    {
      _id: "mock-4",
      initiativeName: "Tree Planting",
      location: { city: "Houston", country: "USA" },
      servicesNeeded: ["Planting", "PR"],
      image: [],
    },
  ];

  const displayInitiatives = (initiatives && initiatives.length > 0)
    ? initiatives
    : (process.env.NODE_ENV === "development" ? mockInitiatives : []);

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
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="Search by initiative name, description, services, etc."
        />
        <TextField
          fullWidth
          label="Location (e.g., 'New York' or 'New York, United States')"
          variant="outlined"
          size="small"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          placeholder="City or City, Country"
        />

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
      <Box
        component="div"
        sx={{
          width: "100%",
          display: "grid",
          gap: 2,
          gridTemplateColumns: "1fr",
          gridAutoRows: "1fr",
          alignItems: "stretch",
          justifyItems: "stretch",
          "@media only screen and (min-width:1501px)": {
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          },
        }}
      >
        {displayInitiatives &&
          displayInitiatives?.slice(0, visibleCount).map((item) => (
            <Box key={item._id} sx={{ height: "100%", display: "flex" }}>
              <InitiativeCard {...item} />
            </Box>
          ))}
      </Box>
      {initiatives && initiatives.length > visibleCount && (
        <Button
          onClick={() => setVisibleCount((c) => c + 5)}
          sx={{ background: "#FFD15C", color: "#000", textTransform: "capitalize" }}
        >
          More
        </Button>
      )}
    </Box>
  );
}
