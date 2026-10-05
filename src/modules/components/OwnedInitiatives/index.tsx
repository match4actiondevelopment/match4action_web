"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { http } from "@/modules/config/http";
import { InitiativeInterface } from "@/modules/types/types";
import { InitiativeCard } from "../InitiativeCard";
export default function OwnedInitiatives({ userId }: { userId: string }) {
  useEffect(() => {
    if (window.location.hash === "#owned-initiatives") {
      const frame = requestAnimationFrame(() =>
        document.getElementById("owned-initiatives")?.scrollIntoView()
      );
      return () => cancelAnimationFrame(frame);
    }
  }, []);
  const query = useQuery<InitiativeInterface[]>(
    ["owned-initiatives", userId],
    async () => {
      const { data } = await http.get("/initiatives/owned/me", {
        withCredentials: true,
      });
      if (!data?.success || !Array.isArray(data.data))
        throw new Error("Could not load your initiatives.");
      return data.data;
    },
    { enabled: !!userId }
  );
  return (
    <Box
      component="section"
      id="owned-initiatives"
      sx={{ mt: 4, scrollMarginTop: 24 }}
    >
      <Typography variant="h5" gutterBottom>
        Owned Initiatives
      </Typography>
      {query.isLoading ? (
        <CircularProgress aria-label="Loading your initiatives" />
      ) : query.isError ? (
        <Alert
          severity="error"
          action={<Button onClick={() => query.refetch()}>Retry</Button>}
        >
          Could not load your initiatives.
        </Alert>
      ) : query.data?.length ? (
        <Box display="grid" gap={2}>
          {query.data.map((role) => (
            <InitiativeCard key={role._id} {...role} />
          ))}
        </Box>
      ) : (
        <Typography>You have not created any initiatives yet.</Typography>
      )}
      <Button component={NextLink} href="/create-initiative" sx={{ mt: 2 }}>
        Create initiative
      </Button>
    </Box>
  );
}