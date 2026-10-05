"use client";
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
type Result = {
  totalScores: Record<string, number>;
  suggestedIkigai: string;
  updatedAt?: string;
};
export default function SavedIkigaiResults({ userId }: { userId: string }) {
  const query = useQuery<Result | null>(
    ["ikigai-result", userId],
    async () => {
      const { data } = await http.get("/ikigai-responses", {
        withCredentials: true,
      });
      if (!data?.success) throw new Error("Could not load your result.");
      return data.data;
    },
    { enabled: !!userId }
  );
  return (
    <Box component="section" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        My Test Results
      </Typography>
      {query.isLoading ? (
        <CircularProgress aria-label="Loading test result" />
      ) : query.isError ? (
        <Alert
          severity="error"
          action={<Button onClick={() => query.refetch()}>Retry</Button>}
        >
          Could not load your saved result.
        </Alert>
      ) : query.data ? (
        <>
          <Typography sx={{ textTransform: "capitalize" }}>
            Suggested Ikigai: {query.data.suggestedIkigai}
          </Typography>
          <Box
            component="dl"
            display="grid"
            gridTemplateColumns="1fr 1fr"
            gap={1}
          >
            {Object.entries(query.data.totalScores).map(([category, score]) => (
              <Box key={category}>
                <Typography component="dt" sx={{ textTransform: "capitalize" }}>
                  {category}
                </Typography>
                <Typography component="dd" sx={{ m: 0 }}>
                  {score} points
                </Typography>
              </Box>
            ))}
          </Box>
          {query.data.updatedAt && (
            <Typography variant="body2">
              Last saved: {new Date(query.data.updatedAt).toLocaleString()}
            </Typography>
          )}
          <Button component={NextLink} href="/recommended-initiatives">
            View matched opportunities
          </Button>
          <Button component={NextLink} href="/ikigai-demo">
            Retake test
          </Button>
        </>
      ) : (
        <>
          <Typography>You have not saved an Ikigai result yet.</Typography>
          <Button component={NextLink} href="/test">
            Take Ikigai test
          </Button>
        </>
      )}
    </Box>
  );
}