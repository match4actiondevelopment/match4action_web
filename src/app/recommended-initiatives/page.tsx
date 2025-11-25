"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Chip,
  Grid,
  Paper,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
  Rating,
  Divider,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  Psychology as PsychologyIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import NextLink from "next/link";
import { UserContext } from "@/modules/context/user-context";

interface RecommendedInitiative {
  _id: string;
  initiativeName: string;
  description: string;
  location: {
    country: string;
    city: string;
  };
  startDate: string;
  endDate: string;
  eventItemFrame: string;
  eventItemType: string;
  whatMovesThisInitiative: string[];
  whichAreasAreCoveredByThisInitiative: string[];
  servicesNeeded: string[];
  applicants: string[];
  userId: {
    _id: string;
    name: string;
  };
  goals: Array<{
    _id: string;
    name: string;
  }>;
  matchingScore: number;
  matchingReasons: string[];
  createdAt: string;
}

export default function RecommendedInitiatives() {
  const router = useRouter();
  const { isLogged } = useContext(UserContext) ?? {};
  const [recommendations, setRecommendations] = useState<RecommendedInitiative[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const handleInitiativeClick = (initiativeId: string) => {
    if (!isLogged) {
      // Redirect to login page if not authenticated
      window.location.href = '/login';
      return;
    }
    // If authenticated, navigate to the initiative detail page
    window.location.href = `/initiatives/${initiativeId}`;
  };

  const fetchRecommendations = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const response = await fetch("http://localhost:3003/matching/recommendations", {
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch recommendations");
      }

      const data = await response.json();
      setRecommendations(data.data || []);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleRefresh = () => {
    fetchRecommendations(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "#4CAF50"; // Green
    if (score >= 6) return "#FF9800"; // Orange
    if (score >= 4) return "#FF5722"; // Red-Orange
    return "#F44336"; // Red
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8) return "Excellent Match";
    if (score >= 6) return "Good Match";
    if (score >= 4) return "Fair Match";
    return "Weak Match";
  };

  if (loading) {
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
        <Box textAlign="center">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Finding your perfect matches...
          </Typography>
        </Box>
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
      }}
    >
      <Box maxWidth="1200px" mx="auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Box display="flex" alignItems="center" gap={2}>
                <PsychologyIcon sx={{ fontSize: 40, color: "primary.main" }} />
                <Box>
                  <Typography variant="h4" fontWeight={700} color="primary">
                    Recommended Initiatives
                  </Typography>
                  <Typography color="text.secondary">
                    Personalized recommendations based on your Ikigai test results
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                {lastUpdated && (
                  <Typography variant="body2" color="text.secondary">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </Typography>
                )}
                <Tooltip title="Refresh recommendations">
                  <IconButton
                    onClick={handleRefresh}
                    disabled={refreshing}
                    sx={{ bgcolor: "primary.main", color: "white" }}
                  >
                    <RefreshIcon className={refreshing ? "animate-spin" : ""} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {recommendations.length === 0 && !error && (
              <Alert severity="info">
                No recommendations available. Please take the Ikigai test first to get personalized recommendations.
                <Button
                  component={NextLink}
                  href="/ikigai-demo"
                  sx={{ ml: 2 }}
                  variant="outlined"
                  size="small"
                >
                  Take Test
                </Button>
              </Alert>
            )}
          </Paper>
        </motion.div>

        {/* Recommendations Grid */}
        <AnimatePresence>
          <Grid container spacing={3}>
            {recommendations.map((initiative, index) => (
              <Grid item xs={12} md={6} lg={4} key={initiative._id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      overflow: "visible",
                    }}
                  >
                    {/* Matching Score Badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: -10,
                        right: 16,
                        zIndex: 1,
                      }}
                    >
                      <Chip
                        label={`${initiative.matchingScore.toFixed(1)}%`}
                        sx={{
                          bgcolor: getScoreColor(initiative.matchingScore),
                          color: "white",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                        }}
                      />
                    </Box>

                    <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                      {/* Initiative Name */}
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {initiative.initiativeName}
                      </Typography>

                      {/* Match Quality */}
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <TrendingUpIcon sx={{ fontSize: 16, color: getScoreColor(initiative.matchingScore) }} />
                        <Typography variant="body2" color={getScoreColor(initiative.matchingScore)}>
                          {getScoreLabel(initiative.matchingScore)}
                        </Typography>
                      </Box>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          mb: 2,
                        }}
                      >
                        {initiative.description}
                      </Typography>

                      {/* Location */}
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <LocationIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {initiative.location.city}, {initiative.location.country}
                        </Typography>
                      </Box>

                      {/* Event Details */}
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <CalendarIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {initiative.eventItemFrame} • {initiative.eventItemType}
                        </Typography>
                      </Box>

                      {/* Matching Reasons */}
                      {initiative.matchingReasons.length > 0 && (
                        <Box mb={2}>
                          <Typography variant="body2" fontWeight={600} gutterBottom>
                            Why this matches you:
                          </Typography>
                          {initiative.matchingReasons.slice(0, 2).map((reason, idx) => (
                            <Typography
                              key={idx}
                              variant="body2"
                              color="primary"
                              sx={{ fontSize: "0.75rem" }}
                            >
                              • {reason}
                            </Typography>
                          ))}
                        </Box>
                      )}

                      {/* Tags */}
                      <Box mb={2}>
                        <Typography variant="body2" fontWeight={600} gutterBottom>
                          Key Areas:
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={0.5}>
                          {initiative.whatMovesThisInitiative.slice(0, 3).map((tag, idx) => (
                            <Chip
                              key={idx}
                              label={tag}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: "0.7rem", height: 24 }}
                            />
                          ))}
                          {initiative.whatMovesThisInitiative.length > 3 && (
                            <Chip
                              label={`+${initiative.whatMovesThisInitiative.length - 3}`}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: "0.7rem", height: 24 }}
                            />
                          )}
                        </Box>
                      </Box>

                      {/* Organization */}
                      <Box display="flex" alignItems="center" gap={1}>
                        <PeopleIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          by {initiative.userId?.name || "Unknown Organization"}
                        </Typography>
                      </Box>
                    </CardContent>

                    <Divider />

                    <CardActions sx={{ p: 2 }}>
                      <Button
                        onClick={() => handleInitiativeClick(initiative._id)}
                        variant="contained"
                        fullWidth
                        sx={{ fontWeight: 600 }}
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </AnimatePresence>

        {/* Empty State */}
        {recommendations.length === 0 && !loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Paper elevation={3} sx={{ p: 6, textAlign: "center" }}>
              <PsychologyIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                No Recommendations Yet
              </Typography>
              <Typography color="text.secondary" mb={3}>
                Take our Ikigai test to discover initiatives that match your passions and goals.
              </Typography>
              <Button
                component={NextLink}
                href="/ikigai-demo"
                variant="contained"
                size="large"
              >
                Take Ikigai Test
              </Button>
            </Paper>
          </motion.div>
        )}
      </Box>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </Box>
  );
}
