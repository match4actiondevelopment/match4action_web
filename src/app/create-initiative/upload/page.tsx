"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function UploadInitiativeExcel() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
        "application/vnd.ms-excel", // .xls
      ];
      
      if (!validTypes.includes(selectedFile.type) && !selectedFile.name.match(/\.(xlsx|xls)$/i)) {
        setError("Please upload a valid Excel file (.xlsx or .xls)");
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const baseURL = process.env.NEXT_PUBLIC_API_PATH || "http://localhost:3003";
      const response = await fetch(`${baseURL}/initiatives/upload-excel`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload Excel file");
      }

      const result = await response.json();
      setSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/initiatives");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while uploading");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          background: "linear-gradient(to bottom right, #EEF2FF, #FFFFFF)",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, textAlign: "center", maxWidth: 400 }}>
          <Typography variant="h5" color="success.main" gutterBottom>
            ✅ Excel File Uploaded Successfully!
          </Typography>
          <Typography color="text.secondary">
            Your initiatives are being processed. Redirecting...
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: "linear-gradient(to bottom right, #EEF2FF, #FFFFFF)",
        py: 8,
        px: 2,
      }}
    >
      <Box maxWidth="700px" mx="auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper elevation={3} sx={{ p: { xs: 3, sm: 6 } }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => router.push("/create-initiative")}
              sx={{ mb: 3 }}
            >
              Back to Options
            </Button>

            <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
              Upload Excel File
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Upload an Excel file (.xlsx or .xls) containing multiple initiatives to create them all at once.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Card sx={{ mb: 3, border: "2px dashed", borderColor: "primary.main" }}>
              <CardContent sx={{ textAlign: "center", py: 4 }}>
                <UploadFileIcon sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  {file ? file.name : "Select Excel File"}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  {file
                    ? `File size: ${(file.size / 1024).toFixed(2)} KB`
                    : "Click the button below to choose your Excel file"}
                </Typography>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <Button
                  variant="outlined"
                  startIcon={<DescriptionIcon />}
                  onClick={() => fileInputRef.current?.click()}
                  sx={{ mb: 2 }}
                >
                  {file ? "Change File" : "Choose File"}
                </Button>
              </CardContent>
            </Card>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() => router.back()}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleUpload}
                disabled={!file || loading}
                startIcon={loading ? <CircularProgress size={20} /> : <UploadFileIcon />}
                sx={{ minWidth: 150 }}
              >
                {loading ? "Uploading..." : "Upload Excel"}
              </Button>
            </Box>

            <Box sx={{ mt: 4, p: 2, bgcolor: "grey.50", borderRadius: 2 }}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Excel File Format Requirements:
              </Typography>
              <Typography variant="body2" component="div" color="text.secondary">
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li>File must be in .xlsx or .xls format</li>
                  <li>First row should contain column headers</li>
                  <li>Required columns: Initiative Name, Description, Event Frame, Event Type</li>
                  <li>Optional columns: Start Date, End Date, Location, etc.</li>
                </ul>
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
}

