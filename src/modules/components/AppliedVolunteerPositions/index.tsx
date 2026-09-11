"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useGetMyApplications } from "@/modules/hooks/useGetMyApplications";

type AppliedVolunteerPositionsProps = {
  userId?: string;
};

export default function AppliedVolunteerPositions({
  userId,
}: AppliedVolunteerPositionsProps) {
  const { data, isLoading, isError, refetch } =
    useGetMyApplications(userId);

  return (
    <Box
      component="section"
      id="applied-volunteer-positions"
      sx={{ mt: 4, width: "100%" }}
    >
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
        Applied volunteer positions
      </Typography>

      {!userId ? (
        <Typography>Sign in to view your applications.</Typography>
      ) : isLoading ? (
        <CircularProgress
          size={24}
          aria-label="Loading applications"
        />
      ) : isError ? (
        <Alert
          severity="error"
          action={
            <Button onClick={() => refetch()}>
              Retry
            </Button>
          }
        >
          Could not load your applications.
        </Alert>
      ) : !data?.length ? (
        <Typography>
          You have not applied to any positions yet.
        </Typography>
      ) : (
        <TableContainer>
          <Table
            size="small"
            aria-label="Applied volunteer positions"
          >
            <TableHead>
              <TableRow>
                <TableCell>Role</TableCell>
                <TableCell>Organisation</TableCell>
                <TableCell>Date applied</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((application) => (
                <TableRow key={application.applicationId}>
                  <TableCell>
                    {application.roleName}
                  </TableCell>

                  <TableCell>
                    {application.organisationName ||
                      "Organisation unavailable"}
                  </TableCell>

                  <TableCell>
                    {application.appliedAt
                      ? new Date(
                          application.appliedAt
                        ).toLocaleDateString()
                      : "Date unavailable"}
                  </TableCell>

                  <TableCell
                    sx={{ textTransform: "capitalize" }}
                  >
                    {application.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Button
        component={NextLink}
        href="/recommended-initiatives"
        sx={{ mt: 2 }}
      >
        Browse recommendations
      </Button>
    </Box>
  );
}