"use client";
import { Alert, Box, Button } from "@mui/material";
import NextLink from "next/link";
export default function UploadInitiatives() {
  return (
    <Box sx={{ p: 4 }}>
      <Alert severity="info">
        Spreadsheet import is not available in this version.
      </Alert>
      <Button component={NextLink} href="/create-initiative/manual">
        Create initiative manually
      </Button>
    </Box>
  );
}