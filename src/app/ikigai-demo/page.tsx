"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  useEffect(() => {
    fetch("http://localhost:3003/ikigai-questions")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch questions: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
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
    try {
      // Prepare answers for the API
      const answersArray = Object.entries(answers).map(([questionId, option]) => ({
        questionId,
        optionValue: option.value,
        category: option.category,
      }));

      const response = await fetch("http://localhost:3003/ikigai-responses", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: answersArray,
        }),
      });

      if (!response.ok) {
        console.error("Failed to save Ikigai results");
      } else {
        setResultsSaved(true);
      }
    } catch (error) {
      console.error("Error saving Ikigai results:", error);
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

    const colors: Record<string, string> = {
      passion: "#FCE7F3",
      mission: "#DBEAFE",
      profession: "#DCFCE7",
      vocation: "#EDE9FE",
    };

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
          <Box maxWidth="800px" width="100%" textAlign="center">
            <Typography variant="h4" fontWeight={700} color="primary" mb={3}>
              🎉 Your Ikigai Results
            </Typography>
            <Typography color="text.secondary" mb={4}>
              Here&apos;s a breakdown of your answers by category:
            </Typography>
            
            <Box mb={4}>
              {resultsSaved ? (
                <Alert severity="success" sx={{ mb: 2 }}>
                  ✅ Your results have been saved! You can now get personalized recommendations.
                </Alert>
              ) : (
                <Alert severity="info" sx={{ mb: 2 }}>
                  💾 Saving your results for 24 hrs, if you want to see the match initiatives, please Sign Up or Log In
                </Alert>
              )}
              <Button
                component="a"
                href="/recommended-initiatives"
                variant="contained"
                size="large"
                disabled={!resultsSaved}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: "999px",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: 3,
                  backgroundColor: resultsSaved ? "#4F46E5" : "#D1D5DB",
                  color: "white",
                  ":hover": { backgroundColor: resultsSaved ? "#4338CA" : "#D1D5DB" },
                }}
              >
                {resultsSaved ? "View Recommended Initiatives" : "Saving Results..."}
              </Button>
            </Box>

          <Box
            display="grid"
            gap={3}
            gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
          >
            {Object.entries(grouped).map(([category, opts]) => (
              <motion.div key={category} whileHover={{ scale: 1.03 }}>
                <Box
                  p={3}
                  borderRadius="12px"
                  boxShadow={2}
                  sx={{
                    background: colors[category],
                    textAlign: "left",
                  }}
                >
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    {category}
                  </Typography>
                  {opts.length > 0 ? (
                    <ul>
                      {opts.map((o, i) => (
                        <li key={i}>• {o.text}</li>
                      ))}
                    </ul>
                  ) : (
                    <Typography
                      fontSize="0.875rem"
                      fontStyle="italic"
                      color="text.secondary"
                    >
                      No answers chosen.
                    </Typography>
                  )}
                </Box>
              </motion.div>
            ))}
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
