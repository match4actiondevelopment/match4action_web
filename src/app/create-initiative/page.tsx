"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { motion } from "framer-motion";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function CreateInitiativeLanding() {
  const router = useRouter();

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: "linear-gradient(to bottom right, #EEF2FF, #FFFFFF)",
        py: 8,
        px: 2,
      }}
    >
      <Box maxWidth="900px" mx="auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper elevation={3} sx={{ p: { xs: 3, sm: 6 }, textAlign: "center" }}>
            <Typography variant="h3" fontWeight={700} color="primary" gutterBottom>
              Create Initiative
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={4}>
              Choose how you would like to create your initiative
            </Typography>

            <Grid container spacing={4} sx={{ mt: 2 }}>
              {/* Upload Excel Option */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: "center", pt: 4 }}>
                    <UploadFileIcon
                      sx={{
                        fontSize: 64,
                        color: "primary.main",
                        mb: 2,
                      }}
                    />
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      Upload Excel File
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Upload an Excel file with multiple initiatives to create them all at once. Perfect for bulk uploads.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
                      Supports .xlsx and .xls formats
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center", pb: 3 }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<UploadFileIcon />}
                      onClick={() => router.push("/create-initiative/upload")}
                      sx={{ minWidth: 200 }}
                    >
                      Upload Excel
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              {/* Manual Create Option */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: "center", pt: 4 }}>
                    <AddCircleOutlineIcon
                      sx={{
                        fontSize: 64,
                        color: "primary.main",
                        mb: 2,
                      }}
                    />
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      Create Manually
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Fill out a detailed form to create a single initiative. You can specify all the details and requirements.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
                      Step-by-step form with all fields
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center", pb: 3 }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<AddCircleOutlineIcon />}
                      onClick={() => router.push("/create-initiative/manual")}
                      sx={{ minWidth: 200 }}
                    >
                      Create Initiative
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Button
                variant="text"
                onClick={() => router.back()}
                sx={{ color: "text.secondary" }}
              >
                ← Go Back
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
}
