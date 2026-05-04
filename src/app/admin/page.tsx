"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  CircularProgress,
  TextField,
  Alert,
} from "@mui/material";
import { UserContext } from "@/modules/context/user-context";
import { UserRole } from "@/modules/types/types";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user } = useContext(UserContext) ?? {};
  const [blogLink, setBlogLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Basic protection
    if (user && user.role !== UserRole.admin) {
      router.push("/");
    } else if (user?.role === UserRole.admin) {
      fetchData();
    }
  }, [user, router]);

  const fetchData = async () => {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_PATH || "http://localhost:3003";
      const res = await fetch(`${baseURL}/bloglink`);
      const data = await res.json();
      if (data.success && data.data) {
        setBlogLink(data.data.url);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccessMsg("");
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_PATH || "http://localhost:3003";
      const res = await fetch(`${baseURL}/bloglink`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ url: blogLink }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg("Blog link updated successfully!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" height="100vh" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6, minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
        Admin Dashboard
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Site Settings
        </Typography>

        {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

        <Box mt={3}>
          <TextField
            label="External Blog Link (Medium, etc.)"
            fullWidth
            value={blogLink}
            onChange={(e) => setBlogLink(e.target.value)}
            helperText="Users will be redirected to this link when clicking 'Blog' in the navigation."
          />
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button variant="contained" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
