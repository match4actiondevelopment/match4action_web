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
import {
  detailHref,
  rememberListPosition,
  useRestoreListPosition,
} from "@/modules/utils/listNavigation";
import { http } from "@/modules/config/http";

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
  const {
    isLogged,
    user,
    isLoading: sessionLoading,
  } = useContext(UserContext) ?? {};
  const [recommendations, setRecommendations] = useState<
    RecommendedInitiative[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const handleInitiativeClick = (initiativeId: string) => {
    if (!isLogged) {
      // Redirect to login page if not authenticated
      window.location.href = "/login";
      return;
    }
    // If authenticated, navigate to the initiative detail page
    rememberListPosition();
    window.location.href = detailHref(initiativeId);
  };

  const fetchRecommendations = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const response = await http.get("/matching/recommendations", {
        withCredentials: true,
      });

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Failed to fetch recommendations"
        );
      }

      setRecommendations(response.data?.data || []);
      setLastUpdated(new Date());
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (sessionLoading) return;
    if (isLogged && user?.role === "volunteer") void fetchRecommendations();
    else {
      setRecommendations([]);
      setLoading(false);
    }
  }, [sessionLoading, isLogged, user?._id, user?.role]);
  useRestoreListPosition(
    !sessionLoading && !loading && recommendations.length > 0
  );

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

  if (!sessionLoading && (!isLogged || user?.role !== "volunteer"))
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="info">
          {!isLogged
            ? "Log in as a volunteer to see your matches."
            : "Personalised matches are for volunteer accounts."}
        </Alert>
        <Button
          component={NextLink}
          href={!isLogged ? "/login" : "/initiatives"}
        >
          {!isLogged ? "Log in" : "Browse opportunities"}
        </Button>
      </Box>
    );
  if (loading || sessionLoading) {
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
            Finding matched opportunities...
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
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <PsychologyIcon sx={{ fontSize: 40, color: "primary.main" }} />
                <Box>
                  <Typography variant="h4" fontWeight={700} color="primary">
                    These options can help you explore
                  </Typography>
                  <Typography color="text.secondary">
                    Personalized recommendations based on your Ikigai test
                    results
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
                <Button onClick={handleRefresh} disabled={refreshing}>
                  Retry
                </Button>
              </Alert>
            )}

            {recommendations.length === 0 && !error && (
              <Alert severity="info">
                No active matches are available for your current result. You can
                browse opportunities or take the test.
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
                        label={`Match score: ${initiative.matchingScore.toFixed(
                          1
                        )}/10`}
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
                        <TrendingUpIcon
                          sx={{
                            fontSize: 16,
                            color: getScoreColor(initiative.matchingScore),
                          }}
                        />
                        <Typography
                          variant="body2"
                          color={getScoreColor(initiative.matchingScore)}
                        >
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
                        <LocationIcon
                          sx={{ fontSize: 16, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {[
                            initiative.location?.city,
                            initiative.location?.country,
                          ]
                            .filter(Boolean)
                            .join(", ") || "Location not provided"}
                        </Typography>
                      </Box>

                      {[
                        initiative.eventItemFrame,
                        initiative.eventItemType,
                      ].some(Boolean) && (
                        <Box display="flex" alignItems="center" gap={1} mb={2}>
                          <CalendarIcon
                            sx={{ fontSize: 16, color: "text.secondary" }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {[
                              initiative.eventItemFrame,
                              initiative.eventItemType,
                            ]
                              .filter(Boolean)
                              .join(" · ")}
                          </Typography>
                        </Box>
                      )}

                      {/* Matching Reasons */}
                      <Box mb={2}>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          gutterBottom
                        >
                          Why this matches you:
                        </Typography>

                        {(initiative.matchingReasons?.length
                          ? initiative.matchingReasons.slice(0, 2)
                          : [
                              "This opportunity may align with your Ikigai profile.",
                            ]
                        ).map((reason, index) => (
                          <Typography
                            key={index}
                            variant="body2"
                            color="primary"
                            sx={{ fontSize: "0.75rem" }}
                          >
                            • {reason}
                          </Typography>
                        ))}
                      </Box>

                      {/* Tags */}
                      <Box mb={2}>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          gutterBottom
                        >
                          Key Areas:
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={0.5}>
                          {(initiative.whatMovesThisInitiative || [])
                            .slice(0, 3)
                            .map((tag, idx) => (
                              <Chip
                                key={idx}
                                label={tag}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: "0.7rem", height: 24 }}
                              />
                            ))}
                          {(initiative.whatMovesThisInitiative || []).length >
                            3 && (
                            <Chip
                              label={`+${
                                (initiative.whatMovesThisInitiative || [])
                                  .length - 3
                              }`}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: "0.7rem", height: 24 }}
                            />
                          )}
                        </Box>
                      </Box>

                      {/* Organization */}
                      <Box display="flex" alignItems="center" gap={1}>
                        <PeopleIcon
                          sx={{ fontSize: 16, color: "text.secondary" }}
                        />
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
      </Box>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </Box>
  );
}