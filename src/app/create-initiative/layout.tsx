"use client";
import React, { useContext } from "react";
import { Alert, Box, Button, CircularProgress } from "@mui/material";
import NextLink from "next/link";
import { UserContext } from "@/modules/context/user-context";
export default function CreateInitiativeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useContext(UserContext);
  if (!context || context.isLoading)
    return (
      <Box sx={{ p: 4 }}>
        <CircularProgress aria-label="Checking account" />
      </Box>
    );
  if (!context.isLogged)
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="info">Please log in to create an initiative.</Alert>
        <Button component={NextLink} href="/login">
          Log in
        </Button>
      </Box>
    );
  if (context.user?.roleSelectionPending)
    return (
      <Box sx={{ p: 4 }}>
        <Button component={NextLink} href="/role-selection">
          Complete registration
        </Button>
      </Box>
    );
  if (!["organization", "admin"].includes(context.user?.role || ""))
    return (
      <Alert severity="info">
        An organisation account is required to create initiatives.
      </Alert>
    );
  return <>{children}</>;
}