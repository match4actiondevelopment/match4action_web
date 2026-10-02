"use client";

import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
import {
  Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent,
  DialogTitle, Grid, MenuItem, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, Typography,
} from "@mui/material";
import { UserContext } from "../context/user-context";
import { getCurrentAccount } from "../services/account";
import { UserI } from "../types/types";
import {
  downloadReport, fetchReport, fetchReportDetail, fetchReportRoles, ReportFilters, ReportRow,
} from "../services/reports";

const initial: ReportFilters = { range: "month", from: "", to: "", role: "", status: "", location: "", source: "" };
const statuses = ["applied", "viewed", "shortlisted", "accepted", "declined", "withdrawn", "closed"];
const sources: Record<string, string> = {
  recommendations: "Recommendations", initiatives: "Opportunity list",
  role_details: "Role details (entry path unavailable)", unknown: "Unknown",
};
const display = (value: string | null | undefined) => value || "Unavailable";
const date = (value: string | null) => value
  ? new Date(value).toISOString().replace("T", " ").replace(/\.\d{3}Z$/, " UTC") : "Date unavailable";
const message = (error: unknown) => error instanceof Error ? error.message : "Could not load the report.";

export default function ApplicationReports() {
  const context = useContext(UserContext);
  const setUser = context?.setUser;
  const [account, setAccount] = useState<UserI | null>(null);
  const [checking, setChecking] = useState(true);
  const [sessionError, setSessionError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [draft, setDraft] = useState(initial);
  const [filters, setFilters] = useState(initial);
  const [page, setPage] = useState(1);
  const [selection, setSelection] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    const controller = new AbortController(); let active = true;
    setChecking(true); setAccount(null); setSessionError("");
    getCurrentAccount(controller.signal).then(user => {
      if (!active) return;
      setAccount(user); setUser?.(user);
    }).catch(error => { if (active) setSessionError(message(error)); })
      .finally(() => { if (active) setChecking(false); });
    return () => { active = false; controller.abort(); };
  }, [attempt, setUser]);

  const allowed = !!account && account.roleSelectionPending !== true &&
    (account.role === "organization" || account.role === "admin");
  const report = useQuery({
    queryKey: ["application-report", account?._id, filters, page],
    queryFn: ({ signal }) => fetchReport(filters, page, signal),
    enabled: allowed, retry: false, cacheTime: 0,
  });
  const roles = useQuery({
    queryKey: ["report-roles", account?._id],
    queryFn: ({ signal }) => fetchReportRoles(signal),
    enabled: allowed, retry: false, cacheTime: 0,
  });
  const detail = useQuery({
    queryKey: ["report-detail", account?._id, selection],
    queryFn: ({ signal }) => fetchReportDetail(selection!, signal),
    enabled: allowed && !!selection, retry: false, cacheTime: 0,
  });

  async function exportCsv() {
    setExporting(true); setActionError("");
    try { await downloadReport(filters); }
    catch (error) { setActionError(message(error)); }
    finally { setExporting(false); }
  }
  const field = (key: keyof ReportFilters, value: string) => setDraft(old => ({ ...old, [key]: value }));
  const pages = Math.max(1, Math.ceil((report.data?.total || 0) / 25));

  return (
    <Box component="main" sx={{ maxWidth: 1300, mx: "auto", my: 5, px: 2 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>Volunteer application reports</Typography>
      {checking ? <CircularProgress aria-label="Checking account" /> : sessionError ? (
        <Alert severity="error" action={<Button onClick={() => setAttempt(v => v + 1)}>Retry</Button>}>
          {sessionError} <NextLink href="/login">Log in</NextLink>
        </Alert>
      ) : !allowed ? (
        <Alert severity="info">Reports are available to organisation accounts and approved platform admins.
          {account?.roleSelectionPending === true && <NextLink href="/role-selection"> Complete registration</NextLink>}
        </Alert>
      ) : (
        <>
          <Typography sx={{ mb: 2 }}>
            {account?.role === "admin" ? "Applications across organisations." : "Applications to your organisation’s roles."}
            {" "}Dates use UTC. Weeks run Monday to Sunday.
          </Typography>
          <Paper component="form" variant="outlined" sx={{ p: 2, mb: 3 }} onSubmit={event => {
            event.preventDefault(); setPage(1); setSelection(null); setFilters({ ...draft }); setActionError("");
          }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField select fullWidth label="Date range" value={draft.range} onChange={e => field("range", e.target.value)}>
                  <MenuItem value="day">Today</MenuItem><MenuItem value="week">This week</MenuItem>
                  <MenuItem value="month">This month</MenuItem><MenuItem value="custom">Custom dates</MenuItem>
                  <MenuItem value="all">All dates (includes undated)</MenuItem>
                </TextField>
              </Grid>
              {draft.range === "custom" && <>
                <Grid item xs={12} sm={4}><TextField fullWidth required type="date" label="From (UTC)"
                  InputLabelProps={{ shrink: true }} value={draft.from} onChange={e => field("from", e.target.value)} /></Grid>
                <Grid item xs={12} sm={4}><TextField fullWidth required type="date" label="Through (UTC)"
                  InputLabelProps={{ shrink: true }} value={draft.to} onChange={e => field("to", e.target.value)} /></Grid>
              </>}
              <Grid item xs={12} sm={4}>
                <TextField select fullWidth label="Role" value={draft.role} onChange={e => field("role", e.target.value)}>
                  <MenuItem value="">All roles</MenuItem>
                  {(roles.data || []).map(role => <MenuItem key={role._id} value={role._id}>
                    {role.name} — {display(role.organisation)}
                  </MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField select fullWidth label="Application status" value={draft.status} onChange={e => field("status", e.target.value)}>
                  <MenuItem value="">All statuses</MenuItem>
                  {statuses.map(status => <MenuItem key={status} value={status}>{status}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}><TextField fullWidth label="Opportunity location" value={draft.location}
                inputProps={{ maxLength: 120 }} onChange={e => field("location", e.target.value)} /></Grid>
              <Grid item xs={12} sm={4}>
                <TextField select fullWidth label="Application source" value={draft.source} onChange={e => field("source", e.target.value)}>
                  <MenuItem value="">All sources</MenuItem>
                  {Object.entries(sources).map(([value, label]) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button type="submit" variant="contained">View report</Button>
                <Button type="button" onClick={() => { setDraft(initial); setFilters(initial); setPage(1); setActionError(""); }}>Reset</Button>
                <Button type="button" variant="outlined" disabled={exporting || report.isFetching || !report.data || report.isError}
                  onClick={exportCsv}>{exporting ? "Exporting…" : "Export CSV"}</Button>
              </Grid>
            </Grid>
          </Paper>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Export includes all rows matching the displayed report filters, not only this page.
            Undated applications appear only under All dates.
          </Typography>
          {roles.isError && <Alert severity="error" sx={{ mb: 2 }}
            action={<Button onClick={() => roles.refetch()}>Retry</Button>}>{message(roles.error)}</Alert>}
          {actionError && <Alert severity="error" sx={{ mb: 2 }}>{actionError}</Alert>}
          {report.isFetching ? <CircularProgress aria-label="Loading report" /> : report.isError ? (
            <Alert severity="error" action={<Button onClick={() => report.refetch()}>Retry</Button>}>{message(report.error)}</Alert>
          ) : report.data && <>
            <Typography sx={{ mb: 1 }}><strong>{report.data.total}</strong> matching applications</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Within these filters: Today {report.data.summary.day} · This week {report.data.summary.week}
              {" "}· This month {report.data.summary.month} · Date unavailable {report.data.summary.undated}
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small" aria-label="Volunteer applications">
                <TableHead><TableRow>
                  {["Volunteer", "Email", "Date applied (UTC)", "Role", "Status", "Organisation", "Location", "Source", "Details"].map(name =>
                    <TableCell key={name}>{name}</TableCell>)}
                </TableRow></TableHead>
                <TableBody>
                  {report.data.rows.length === 0 ? <TableRow><TableCell colSpan={9}>No applications match these filters.</TableCell></TableRow>
                    : report.data.rows.map(row => <TableRow key={row.key}>
                      <TableCell>{display(row.volunteerName)}</TableCell><TableCell>{display(row.volunteerEmail)}</TableCell>
                      <TableCell sx={{ minWidth: 180 }}>{date(row.appliedAt)}</TableCell><TableCell>{row.roleName}</TableCell>
                      <TableCell>{row.status}</TableCell><TableCell>{display(row.organisationName)}</TableCell>
                      <TableCell>{display(row.opportunityLocation)}</TableCell><TableCell>{sources[row.applicationSource] || "Unknown"}</TableCell>
                      <TableCell><Button onClick={() => setSelection(row.key)}>View</Button></TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
              <Button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
              <Typography>Page {page} of {pages}</Typography>
              <Button disabled={page >= pages} onClick={() => setPage(p => p + 1)}>Next</Button>
            </Box>
          </>}
          <Dialog open={!!selection} onClose={() => setSelection(null)} fullWidth maxWidth="sm">
            <DialogTitle>Application details</DialogTitle>
            <DialogContent>
              {detail.isFetching ? <CircularProgress aria-label="Loading application" /> : detail.isError ?
                <Alert severity="error">{message(detail.error)}</Alert> : detail.data && <ApplicationDetail row={detail.data} />}
            </DialogContent>
            <DialogActions><Button onClick={() => setSelection(null)}>Close</Button></DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
}
function ApplicationDetail({ row }: { row: ReportRow }) {
  const fields = {
    Volunteer: display(row.volunteerName), Email: display(row.volunteerEmail), Role: row.roleName,
    Organisation: display(row.organisationName), "Date applied": date(row.appliedAt), Status: row.status,
    "Opportunity location": display(row.opportunityLocation), Source: sources[row.applicationSource] || "Unknown",
  };
  return <Box component="dl">{Object.entries(fields).map(([label, value]) => <Box key={label} sx={{ mb: 2 }}>
    <Typography component="dt" fontWeight={600}>{label}</Typography>
    <Typography component="dd" sx={{ ml: 0, overflowWrap: "anywhere" }}>{value}</Typography>
  </Box>)}</Box>;
}