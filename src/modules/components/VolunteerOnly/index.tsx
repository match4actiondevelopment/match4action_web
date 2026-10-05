"use client";
import { useContext, ReactNode } from "react";
import { Alert, Box, Button, CircularProgress } from "@mui/material";
import NextLink from "next/link";
import { UserContext } from "@/modules/context/user-context";
export default function VolunteerOnly({ children }: { children: ReactNode }) {
  const context = useContext(UserContext);
  if (!context || context.isLoading)
    return (
      <Box sx={{ p: 4 }}>
        <CircularProgress aria-label="Checking account" />
      </Box>
    );
  if (context.isLogged && context.user?.role !== "volunteer")
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="info">
          The Ikigai test helps volunteers find opportunities. Manage your
          organisation’s initiatives from your profile.
        </Alert>
        <Button component={NextLink} href="/profile">
          My profile
        </Button>
        <Button component={NextLink} href="/initiatives">
          Browse opportunities
        </Button>
      </Box>
    );
  return <>{children}</>;
}