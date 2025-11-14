"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  Paper,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { motion } from "framer-motion";

interface InitiativeFormData {
  initiativeName: string;
  description: string;
  eventItemFrame: string;
  eventItemType: string;
  whatMovesThisInitiative: string[];
  whichAreasAreCoveredByThisInitiative: string[];
  servicesNeeded: string[];
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  postalCode: string;
  website: string;
  location: {
    country: string;
    city: string;
  };
  isRemote: boolean;
}

const eventFrames = ["One-time", "Weekly", "Monthly", "Ongoing"];
const eventTypes = [
  "Community Service",
  "Education",
  "Environmental",
  "Healthcare",
  "Technology",
  "Arts & Culture",
  "Sports & Recreation",
  "Other",
];

const motivationOptions = [
  "Community Building",
  "Education Equality",
  "Environmental Protection",
  "Health & Wellness",
  "Digital Inclusion",
  "Youth Empowerment",
  "Senior Care",
  "Food Security",
  "Housing",
  "Mental Health",
  "Climate Action",
  "Social Justice",
];

const areaOptions = [
  "Urban Agriculture",
  "Education",
  "Community Development",
  "Technology Education",
  "Youth Development",
  "Digital Education",
  "Senior Services",
  "Environmental Conservation",
  "Marine Biology",
  "Community Service",
  "Healthcare",
  "Community Health",
];

const serviceOptions = [
  "Teaching",
  "Mentoring",
  "Gardening",
  "Landscaping",
  "Fundraising",
  "Event Planning",
  "Communication",
  "Technical Support",
  "Curriculum Development",
  "Workshop Facilitation",
  "Senior Care",
  "Nutrition Knowledge",
  "Health Education",
  "Patience",
  "Basic Tech Support",
  "Technology Teaching",
  "Beach Cleanup",
  "Environmental Education",
  "Data Collection",
  "Community Outreach",
];

export default function CreateInitiative() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const eventFrameSelectRef = useRef<HTMLDivElement>(null);
  const eventTypeSelectRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<InitiativeFormData>({
    initiativeName: "",
    description: "",
    eventItemFrame: "",
    eventItemType: "",
    whatMovesThisInitiative: [],
    whichAreasAreCoveredByThisInitiative: [],
    servicesNeeded: [],
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    postalCode: "",
    website: "",
    location: {
      country: "",
      city: "",
    },
    isRemote: false,
  });

  // Ensure menu renders properly - fix for dropdown clipping
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'menu-overflow-fix';
    style.textContent = `
      /* Ensure menu container doesn't clip */
      body {
        overflow-x: hidden !important;
      }
      body > div[role="presentation"] {
        overflow: visible !important;
        position: fixed !important;
      }
      /* Menu paper styles */
      .MuiPaper-root.MuiMenu-paper {
        max-width: calc(100vw - 32px) !important;
        overflow: visible !important;
        position: fixed !important;
        z-index: 1300 !important;
        box-sizing: border-box !important;
      }
      /* Portal container */
      [data-mui-portal] {
        overflow: visible !important;
      }
      /* Ensure parent containers don't clip */
      .MuiPopover-root {
        overflow: visible !important;
      }
    `;
    if (!document.getElementById('menu-overflow-fix')) {
      document.head.appendChild(style);
    }
    
    // Also add observer to fix menu when it appears
    const observer = new MutationObserver(() => {
      const menus = document.querySelectorAll('.MuiPaper-root.MuiMenu-paper');
      menus.forEach((menu) => {
        const menuEl = menu as HTMLElement;
        menuEl.style.overflow = 'visible';
        menuEl.style.maxWidth = 'calc(100vw - 32px)';
        menuEl.style.position = 'fixed';
        
        // Also fix parent presentation div
        const presentation = menuEl.closest('div[role="presentation"]') as HTMLElement;
        if (presentation) {
          presentation.style.overflow = 'visible';
        }
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      const existingStyle = document.getElementById('menu-overflow-fix');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
      observer.disconnect();
    };
  }, []);


  const handleInputChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof InitiativeFormData],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleArrayChange = (field: keyof InitiativeFormData, value: string) => {
    const currentArray = formData[field] as string[];
    if (currentArray.includes(value)) {
      setFormData((prev) => ({
        ...prev,
        [field]: currentArray.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: [...currentArray, value],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Convert time strings to Date objects
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

      // Prepare the data to send
      const submitData = {
        ...formData,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
      };

      // If it's remote, set location to indicate remote work
      if (formData.isRemote) {
        submitData.location = {
          country: "Remote",
          city: "Remote"
        };
        submitData.postalCode = "Remote";
      }

      const response = await fetch("http://localhost:3003/initiatives", {
        method: "POST",
        credentials: "include", // This will send cookies automatically
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create initiative");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/initiatives");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
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
            ✅ Initiative Created Successfully!
          </Typography>
          <Typography color="text.secondary">
            Redirecting to initiatives page...
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
          py: 4,
          px: 2,
          width: '100%',
        }}
      >
      <Box 
        maxWidth="800px" 
        mx="auto"
        sx={{
          width: '100%',
          position: 'relative',
          overflow: 'visible',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: '100%', overflow: 'visible', position: 'relative' }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 2, sm: 4 },
              width: '100%',
              maxWidth: '100%',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
              Create New Initiative
            </Typography>
            <Typography color="text.secondary" mb={4}>
              Fill out the form below to create a new volunteer initiative
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} style={{ width: '100%', overflow: 'visible' }}>
              <Grid 
                container 
                spacing={{ xs: 2, sm: 3 }}
                sx={{ 
                  width: '100%',
                  margin: 0,
                  overflow: 'visible',
                }}
              >
                {/* Basic Information */}
                <Grid item xs={12}>
                  <Typography 
                    variant="h6" 
                    fontWeight={600} 
                    gutterBottom
                    sx={{ 
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      width: '100%'
                    }}
                  >
                    Basic Information
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Initiative Name"
                    value={formData.initiativeName}
                    onChange={(e) => handleInputChange("initiativeName", e.target.value)}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Website (Optional)"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                  />
                </Grid>

                {/* Event Details */}
                <Grid item xs={12}>
                  <Typography 
                    variant="h6" 
                    fontWeight={600} 
                    gutterBottom 
                    sx={{ 
                      mt: 2,
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      width: '100%'
                    }}
                  >
                    Event Details
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box ref={eventFrameSelectRef} sx={{ width: '100%', minWidth: 0 }}>
                    <FormControl fullWidth required>
                      <InputLabel id="event-frame-label">Event Frame</InputLabel>
                      <Select
                        labelId="event-frame-label"
                        value={formData.eventItemFrame}
                        onChange={(e) => handleInputChange("eventItemFrame", e.target.value)}
                        onOpen={(e) => {
                          // Ensure menu width matches select and doesn't get clipped
                          const selectElement = e.target as HTMLElement;
                          const updateMenu = () => {
                            const menu = document.querySelector('.MuiPaper-root.MuiMenu-paper') as HTMLElement;
                            if (menu && selectElement) {
                              const selectRect = selectElement.getBoundingClientRect();
                              const selectWidth = selectRect.width;
                              menu.style.width = `${selectWidth}px`;
                              menu.style.minWidth = `${selectWidth}px`;
                              menu.style.maxWidth = `${Math.min(selectWidth, window.innerWidth - 32)}px`;
                              menu.style.overflow = 'visible';
                              menu.style.position = 'fixed';
                            }
                          };
                          setTimeout(updateMenu, 0);
                          setTimeout(updateMenu, 50);
                          setTimeout(updateMenu, 100);
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              maxHeight: 300,
                            },
                          },
                          anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                          },
                          transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                          },
                          disableScrollLock: true,
                        }}
                      >
                        {eventFrames.map((frame) => (
                          <MenuItem key={frame} value={frame}>
                            {frame}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box ref={eventTypeSelectRef} sx={{ width: '100%', minWidth: 0 }}>
                    <FormControl fullWidth required>
                      <InputLabel id="event-type-label">Event Type</InputLabel>
                      <Select
                        labelId="event-type-label"
                        value={formData.eventItemType}
                        onChange={(e) => handleInputChange("eventItemType", e.target.value)}
                        onOpen={(e) => {
                          // Ensure menu width matches select and doesn't get clipped
                          const selectElement = e.target as HTMLElement;
                          const updateMenu = () => {
                            const menus = document.querySelectorAll('.MuiPaper-root.MuiMenu-paper');
                            const menu = Array.from(menus).pop() as HTMLElement;
                            if (menu && selectElement) {
                              const selectRect = selectElement.getBoundingClientRect();
                              const selectWidth = selectRect.width;
                              menu.style.width = `${selectWidth}px`;
                              menu.style.minWidth = `${selectWidth}px`;
                              menu.style.maxWidth = `${Math.min(selectWidth, window.innerWidth - 32)}px`;
                              menu.style.overflow = 'visible';
                              menu.style.position = 'fixed';
                            }
                          };
                          setTimeout(updateMenu, 0);
                          setTimeout(updateMenu, 50);
                          setTimeout(updateMenu, 100);
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              maxHeight: 300,
                            },
                          },
                          anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                          },
                          transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                          },
                          disableScrollLock: true,
                        }}
                      >
                        {eventTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6} sx={{ width: '100%', maxWidth: '100%' }}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Start Date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                    sx={{ width: '100%', maxWidth: '100%' }}
                  />
                </Grid>

                <Grid item xs={12} md={6} sx={{ width: '100%', maxWidth: '100%' }}>
                  <TextField
                    fullWidth
                    type="date"
                    label="End Date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                    sx={{ width: '100%', maxWidth: '100%' }}
                  />
                </Grid>

                <Grid item xs={12} md={6} sx={{ width: '100%', maxWidth: '100%' }}>
                  <TextField
                    fullWidth
                    type="time"
                    label="Start Time"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange("startTime", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                    sx={{ width: '100%', maxWidth: '100%' }}
                  />
                </Grid>

                <Grid item xs={12} md={6} sx={{ width: '100%', maxWidth: '100%' }}>
                  <TextField
                    fullWidth
                    type="time"
                    label="End Time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange("endTime", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                    sx={{ width: '100%', maxWidth: '100%' }}
                  />
                </Grid>

                {/* Location */}
                <Grid item xs={12}>
                  <Typography 
                    variant="h6" 
                    fontWeight={600} 
                    gutterBottom 
                    sx={{ 
                      mt: 2,
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      width: '100%'
                    }}
                  >
                    Location
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.isRemote}
                        onChange={(e) => handleInputChange("isRemote", e.target.checked)}
                        color="primary"
                      />
                    }
                    label="This is a remote initiative (no physical location required)"
                  />
                </Grid>

                {!formData.isRemote && (
                  <>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Country"
                        value={formData.location.country}
                        onChange={(e) => handleInputChange("location.country", e.target.value)}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="City"
                        value={formData.location.city}
                        onChange={(e) => handleInputChange("location.city", e.target.value)}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Postal Code"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      />
                    </Grid>
                  </>
                )}

                {/* Motivations */}
                <Grid item xs={12}>
                  <Typography 
                    variant="h6" 
                    fontWeight={600} 
                    gutterBottom 
                    sx={{ 
                      mt: 2,
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      width: '100%'
                    }}
                  >
                    What Moves This Initiative?
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Select all that apply
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {motivationOptions.map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        clickable
                        color={formData.whatMovesThisInitiative.includes(option) ? "primary" : "default"}
                        onClick={() => handleArrayChange("whatMovesThisInitiative", option)}
                      />
                    ))}
                  </Box>
                </Grid>

                {/* Areas Covered */}
                <Grid item xs={12}>
                  <Typography 
                    variant="h6" 
                    fontWeight={600} 
                    gutterBottom 
                    sx={{ 
                      mt: 2,
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      width: '100%'
                    }}
                  >
                    Areas Covered
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Select all that apply
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {areaOptions.map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        clickable
                        color={formData.whichAreasAreCoveredByThisInitiative.includes(option) ? "primary" : "default"}
                        onClick={() => handleArrayChange("whichAreasAreCoveredByThisInitiative", option)}
                      />
                    ))}
                  </Box>
                </Grid>

                {/* Services Needed */}
                <Grid item xs={12}>
                  <Typography 
                    variant="h6" 
                    fontWeight={600} 
                    gutterBottom 
                    sx={{ 
                      mt: 2,
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      width: '100%'
                    }}
                  >
                    Services Needed
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Select all that apply
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {serviceOptions.map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        clickable
                        color={formData.servicesNeeded.includes(option) ? "primary" : "default"}
                        onClick={() => handleArrayChange("servicesNeeded", option)}
                      />
                    ))}
                  </Box>
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12} sx={{ mt: 3 }}>
                  <Box display="flex" gap={2} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      onClick={() => router.back()}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={
                        loading || 
                        !formData.initiativeName || 
                        !formData.description ||
                        (!formData.isRemote && (!formData.location.country || !formData.location.city))
                      }
                      sx={{ minWidth: 120 }}
                    >
                      {loading ? <CircularProgress size={20} /> : "Create Initiative"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
}
