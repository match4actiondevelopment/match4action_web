"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { InitiativeCard } from "@/modules/components/InitiativeCard";
import { useGetInitiatives } from "@/modules/hooks/useGetInitiatives";
import { useRestoreListPosition } from "@/modules/utils/listNavigation";
export default function VolunteerInitiatives() {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    count: 5,
  });
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const saved = JSON.parse(
        sessionStorage.getItem("initiative-filters") || "null"
      );
      if (
        saved &&
        typeof saved.search === "string" &&
        typeof saved.location === "string" &&
        Number.isInteger(saved.count) &&
        saved.count > 0
      )
        setFilters(saved);
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      try {
        sessionStorage.setItem("initiative-filters", JSON.stringify(filters));
      } catch {}
    }
  }, [ready, filters]);
  const queryFilters = useMemo(() => {
    const parts = filters.location.split(",").map((p) => p.trim());
    return {
      search: filters.search.trim(),
      ...(parts.length === 2
        ? { city: parts[0], country: parts[1] }
        : { location: parts[0] }),
    };
  }, [filters.search, filters.location]);
  const query = useGetInitiatives(queryFilters);
  useRestoreListPosition(ready && !query.isFetching && !query.isLoading);
  return (
    <Box component="main" sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Browse opportunities
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Explore volunteer roles and find a cause you want to support.
      </Typography>
      <Box display="grid" gap={2} sx={{ mb: 3 }}>
        <TextField
          label="Role or keyword"
          value={filters.search}
          onChange={(e) =>
            setFilters((f) => ({ ...f, search: e.target.value, count: 5 }))
          }
        />
        <TextField
          label="City or City, Country"
          value={filters.location}
          onChange={(e) =>
            setFilters((f) => ({ ...f, location: e.target.value, count: 5 }))
          }
        />
      </Box>
      {query.isLoading ? (
        <CircularProgress aria-label="Loading opportunities" />
      ) : query.isError ? (
        <Alert
          severity="error"
          action={<Button onClick={() => query.refetch()}>Retry</Button>}
        >
          Could not load opportunities.
        </Alert>
      ) : (
        <>
          {!query.data.length && (
            <Typography>No opportunities match these filters.</Typography>
          )}
          <Typography variant="body2" sx={{ mb: 1 }}>
            Most recent first
          </Typography>
          <Box display="grid" gap={2}>
            {[...query.data]
              .sort(
                (a, b) =>
                  (Date.parse(b.createdAt || "") || 0) -
                  (Date.parse(a.createdAt || "") || 0)
              )
              .slice(0, filters.count)
              .map((item) => (
                <InitiativeCard key={item._id} {...item} />
              ))}
          </Box>
          {query.data.length > filters.count && (
            <Button
              onClick={() => setFilters((f) => ({ ...f, count: f.count + 5 }))}
            >
              More
            </Button>
          )}
        </>
      )}
    </Box>
  );
}