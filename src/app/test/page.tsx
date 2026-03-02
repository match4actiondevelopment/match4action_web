"use client";

import React from "react";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import NextLink from "next/link";

export default function IkigaiTestInfo() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const sections = [
    {
      title: "What is Ikigai?",
      description:
        "Ikigai is a Japanese concept that combines four key elements of your life: what you are passionate about, what you are good at, what the world needs, and what you can be rewarded for. Finding your ikigai helps you discover purpose and fulfillment.",
      icon: "",
    },
    {
      title: "How Our Test Works",
      description:
        "Our Ikigai test consists of carefully crafted questions that explore your passions, mission, professional skills, and vocational interests. Your responses are analyzed to reveal your unique Ikigai profile.",
      icon: "",
    },
    {
      title: "Get Personalized Recommendations",
      description:
        "Based on your test results, we'll match you with volunteer opportunities and initiatives that align with your Ikigai. This helps you find meaningful work that truly resonates with you.",
      icon: "",
    },
    {
      title: "Time Estimate",
      description:
        "The test takes approximately 5-10 minutes to complete. You'll answer questions about different life aspects to create a comprehensive Ikigai profile.",
      icon: "",
    },
  ];

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: "linear-gradient(to bottom right, #EEF2FF, #FFFFFF)",
        py: 8,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight={700}
              color="primary"
              mb={2}
              sx={{
                background: "linear-gradient(136.74deg, #B577E1 6.64%, #554BBD 69.76%)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Discover Your Ikigai
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              mb={4}
              sx={{ maxWidth: "600px", mx: "auto" }}
            >
              Find your purpose and get matched with volunteer opportunities that align with your values and passions
            </Typography>
          </Box>
        </motion.div>

        {/* Information Grid */}
        <Grid container spacing={3} mb={8}>
          {sections.map((section, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <motion.div
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid rgba(79, 70, 229, 0.1)",
                    backdropFilter: "blur(10px)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <Box mb={2}>
                    <Typography variant="h4">{section.icon}</Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    color="primary"
                    mb={1}
                  >
                    {section.title}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {section.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            flexWrap="wrap"
          >
            <Button
              component={NextLink}
              href="/ikigai-demo"
              variant="contained"
              size="large"
              sx={{
                px: 5,
                py: 1.8,
                borderRadius: "999px",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "16px",
                boxShadow: 3,
                background: "linear-gradient(136.74deg, #B577E1 6.64%, #554BBD 69.76%)",
                ":hover": {
                  boxShadow: 4,
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Start Test
            </Button>
            <Button
              component={NextLink}
              href="/"
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.8,
                borderRadius: "999px",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "16px",
                borderColor: "#4F46E5",
                color: "#4F46E5",
                ":hover": {
                  borderColor: "#4338CA",
                  color: "#4338CA",
                  backgroundColor: "rgba(79, 70, 229, 0.05)",
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
