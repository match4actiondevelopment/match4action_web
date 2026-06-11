"use client";

import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "../../modules/context/user-context";
import { http } from "../../modules/config/http";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

interface QuestionOption {
  text: string;
  value: number;
  category: "passion" | "mission" | "profession" | "vocation";
}

interface Question {
  _id: string;
  text: string;
  options: QuestionOption[];
}

export default function IkigaiQuiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, QuestionOption>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [resultsSaved, setResultsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const userContext = useContext(UserContext);
  const isLogged = userContext?.isLogged ?? false;

  useEffect(() => {
    http.get("/ikigai-questions")
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAnswer = (questionId: string, option: QuestionOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const saveResults = async () => {
    if (!isLogged) return;
    try {
      setIsSaving(true);
      // Prepare answers for the API
      const answersArray = Object.entries(answers).map(([questionId, option]) => ({
        questionId,
        optionValue: option.value,
        category: option.category,
      }));

      const { data } = await http.post(
        "/ikigai-responses",
        { answers: answersArray },
        { withCredentials: true }
      );

      if (!data?.success) {
        console.error("Failed to save Ikigai results:", data?.message);
        throw new Error(data?.message || "Failed to save Ikigai results");
      } else {
        setResultsSaved(true);
      }
    } catch (error) {
      console.error("Error saving Ikigai results:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFinished(true);
      // Save results when test is completed
      saveResults();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (loading)
    return (
      <Typography textAlign="center" marginTop={10} color="gray">
        Loading questions...
      </Typography>
    );
  if (error)
    return (
      <Typography
        textAlign="center"
        marginTop={10}
        color="red"
        fontWeight={600}
      >
        Error: {error}
      </Typography>
    );

  // Guard against empty questions to avoid accessing undefined
  if (!loading && questions.length === 0) {
    return (
      <Typography textAlign="center" marginTop={10} color="gray">
        No questions available.
      </Typography>
    );
  }

  // 🎉 Results screen
  if (finished) {
    const grouped: Record<string, QuestionOption[]> = {
      passion: [],
      mission: [],
      profession: [],
      vocation: [],
    };

    Object.values(answers).forEach((opt) => {
      grouped[opt.category].push(opt);
    });

    const categoryMeta: Record<
      string,
      { label: string; color: string; accent: string }
    > = {
      passion: { label: "Passion", color: "#EEF2FF", accent: "#4F46E5" },
      mission: { label: "Mission", color: "#EFF6FF", accent: "#1D4ED8" },
      profession: { label: "Profession", color: "#ECFDF5", accent: "#047857" },
      vocation: { label: "Vocation", color: "#FAF5FF", accent: "#7C3AED" },
    };

    return (
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          background: "linear-gradient(180deg, #EEF2FF 0%, #FFFFFF 100%)",
          px: 3,
          py: 6,
        }}
      >
        <Box maxWidth="980px" width="100%">
          <Box
            sx={{
              bgcolor: "#FFFFFF",
              borderRadius: "28px",
              boxShadow: "0px 28px 80px rgba(15, 23, 42, 0.08)",
              p: { xs: 4, md: 5 },
            }}
          >
            <Box textAlign="center" mb={5}>
              <Typography variant="h3" fontWeight={700} color="primary" mb={1}>
                Your Ikigai Results
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 680, mx: "auto" }}>
                These results reflect the four areas that guide your purpose and impact. Use them to discover initiatives that align with your strengths.
              </Typography>
            </Box>

            <Box mb={4}>
              {!isLogged ? (
                <>
                  <Alert severity="warning" sx={{ mb: 3, borderRadius: "18px", fontWeight: 500 }}>
                    💾 Save your Ikigai results and unlock tailored initiative recommendations by logging in or registering.
                  </Alert>
                  <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
                    <Button
                      component="a"
                      href="/login"
                      variant="outlined"
                      sx={{ px: 4, py: 1.5, borderRadius: "999px", fontWeight: 700, textTransform: "none" }}
                    >
                      Log In
                    </Button>
                    <Button
                      component="a"
                      href="/register"
                      variant="contained"
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: "999px",
                        fontWeight: 700,
                        textTransform: "none",
                        backgroundColor: "#4F46E5",
                        color: "#FFFFFF",
                        ":hover": { backgroundColor: "#4338CA" },
                      }}
                    >
                      Sign Up
                    </Button>
                  </Box>
                </>
              ) : resultsSaved ? (
                <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
                  <Alert severity="success" sx={{ width: "100%", borderRadius: "18px", fontWeight: 500 }}>
                    ✅ Your results have been saved successfully.
                  </Alert>
                  <Button
                    component="a"
                    href="/recommended-initiatives"
                    variant="contained"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: "999px",
                      fontWeight: 700,
                      textTransform: "none",
                      boxShadow: 3,
                      backgroundColor: "#4F46E5",
                      color: "#FFFFFF",
                      ":hover": { backgroundColor: "#4338CA" },
                    }}
                  >
                    View Recommended Initiatives
                  </Button>
                </Box>
              ) : isSaving ? (
                <Alert severity="info" sx={{ borderRadius: "18px", fontWeight: 500 }}>
                  Saving your results...
                </Alert>
              ) : (
                <Alert severity="error" sx={{ borderRadius: "18px", fontWeight: 500 }}>
                  Failed to save results. Please try again.
                </Alert>
              )}
            </Box>

            <Box
              display="grid"
              gap={3}
              gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
            >
              {Object.entries(grouped).map(([category, opts]) => (
                <motion.div key={category} whileHover={{ y: -4 }}>
                  <Box
                    sx={{
                      height: "100%",
                      borderRadius: "22px",
                      border: "1px solid rgba(79, 70, 229, 0.12)",
                      background: categoryMeta[category].color,
                      p: 4,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="overline"
                        sx={{
                          display: "inline-block",
                          px: 2,
                          py: 0.5,
                          mb: 2,
                          borderRadius: "999px",
                          backgroundColor: "rgba(255,255,255,0.8)",
                          color: categoryMeta[category].accent,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.14em",
                        }}
                      >
                        {categoryMeta[category].label}
                      </Typography>
                      <Typography variant="h6" fontWeight={700} mb={3}>
                        Key themes
                      </Typography>
                    </Box>

                    {opts.length > 0 ? (
                      <Box
                        component="ul"
                        sx={{
                          pl: 2,
                          m: 0,
                          color: "text.primary",
                          listStyle: "disc",
                          "& li": {
                            mb: 1.5,
                            ml: 2,
                            fontSize: "0.96rem",
                            lineHeight: 1.6,
                          },
                        }}
                      >
                        {opts.map((o, i) => (
                          <li key={i}>{o.text}</li>
                        ))}
                      </Box>
                    ) : (
                      <Typography fontSize="0.95rem" color="text.secondary">
                        No answers chosen.
                      </Typography>
                    )}
                  </Box>
                </motion.div>
              ))}
            </Box>

            <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center" mt={5}>
              <Button
                component="a"
                href="/ikigai-demo"
                variant="outlined"
                sx={{ px: 4, py: 1.5, borderRadius: "999px", fontWeight: 700, textTransform: "none" }}
              >
                Retake the Quiz
              </Button>
              {isLogged && (
                <Button
                  component="a"
                  href="/recommended-initiatives"
                  variant="contained"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: "999px",
                    fontWeight: 700,
                    textTransform: "none",
                    backgroundColor: "#4F46E5",
                    color: "#FFFFFF",
                    ":hover": { backgroundColor: "#4338CA" },
                  }}
                >
                  Recommended Initiatives
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  const currentQuestion = questions[currentIndex];
  const selected = currentQuestion ? answers[currentQuestion._id] : undefined;

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: "linear-gradient(to bottom right, #EEF2FF, #FFFFFF)",
        px: 3,
        py: 6,
      }}
    >
      <Box maxWidth="600px" width="100%">
        {/* Progress bar */}
        <Box mb={4}>
          <Box
            sx={{
              width: "100%",
              height: 10,
              backgroundColor: "#E5E7EB",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
                backgroundColor: "#4F46E5",
                height: "100%",
                transition: "width 0.3s ease",
              }}
            />
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="right"
            mt={1}
          >
            {currentIndex + 1} / {questions.length}
          </Typography>
        </Box>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <Box p={4} bgcolor="white" borderRadius="16px" boxShadow={3}>
              <Typography
                variant="h5"
                fontWeight={700}
                textAlign="center"
                mb={4}
              >
                {currentIndex + 1}. {currentQuestion.text}
              </Typography>

              <Box
                display="grid"
                gap={2}
                gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
              >
                {currentQuestion.options.map((opt) => (
                  <motion.div
                    key={opt.text}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ display: "flex", height: "100%" }}
                  >
                    <Button
                      fullWidth
                      variant={selected?.text === opt.text ? "contained" : "outlined"}
                      onClick={() => handleAnswer(currentQuestion._id, opt)}
                      sx={{
                        py: 2,
                        borderRadius: "12px",
                        fontWeight: 600,
                        textTransform: "none",
                        height: "100%",
                        minHeight: 72,
                        whiteSpace: "normal",
                        textAlign: "center",
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        ...(selected?.text === opt.text
                          ? {
                            backgroundColor: "#4F46E5",
                            color: "white",
                            ":hover": { backgroundColor: "#4338CA" },
                          }
                          : {}),
                      }}
                    >
                      {opt.text}
                    </Button>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <Box mt={4} display="flex" justifyContent="space-between">
          {/* Back button */}
          <Button
            onClick={handleBack}
            disabled={currentIndex === 0}
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: "999px",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: 3,
              backgroundColor: currentIndex === 0 ? "#D1D5DB" : "#E5E7EB",
              color: currentIndex === 0 ? "#9CA3AF" : "#374151",
              ":hover": currentIndex === 0 ? {} : { backgroundColor: "#D1D5DB" },
            }}
          >
            Back
          </Button>

          {/* Next / Finish button */}
          <Button
            onClick={handleNext}
            disabled={!selected}
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: "999px",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: 3,
              backgroundColor: selected ? "#4F46E5" : "#D1D5DB",
              color: selected ? "white" : "#6B7280",
              ":hover": selected ? { backgroundColor: "#4338CA" } : {},
            }}
          >
            {currentIndex === questions.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
