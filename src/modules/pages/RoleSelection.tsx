"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NextImage from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { lato, sourceSerifPro } from "../styles/fonts";

type RoleType = "volunteer" | "organization" | null;

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);
  const router = useRouter();

  const handleRoleSelect = (role: RoleType) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      // For now, both options lead to the same page (initiatives)
      router.push("/initiatives");
    }
  };

  return (
    <Box
      component="main"
      marginTop="2.75rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="0 1rem"
      height="100%"
      sx={(theme) => ({
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
        [theme.breakpoints.up("sm")]: {
          width: "100%",
          maxWidth: "600px",
          margin: "2.75rem auto",
        },
      })}
    >
      <Typography
        className={sourceSerifPro.className}
        variant="h2"
        fontWeight={700}
        marginBottom="2rem"
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            fontSize: "1.75rem",
            lineHeight: "2rem",
            color: theme.palette.text.primary,
            textAlign: "center",
          },
          [theme.breakpoints.up("sm")]: {
            fontSize: "2.5rem",
            lineHeight: "2.5rem",
            color: theme.palette.text.primary,
            textAlign: "center",
          },
        })}
      >
        Select how you want to act?
      </Typography>
      
      <Typography
        className={lato.className}
        variant="body1"
        marginBottom="3rem"
        textAlign="center"
        sx={(theme) => ({
          fontSize: "1.1rem",
          lineHeight: "1.5rem",
          color: theme.palette.text.secondary,
          maxWidth: "500px",
        })}
      >
        Choose the role that best describes how you want to contribute to making a difference
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
        width="100%"
        maxWidth="500px"
        marginBottom="3rem"
      >
        <Button
          onClick={() => handleRoleSelect("volunteer")}
          className={lato.className}
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "120px",
              background: selectedRole === "volunteer" ? "#FFD15C" : "#E5E5E5",
              color: selectedRole === "volunteer" ? theme.palette.text.primary : theme.palette.text.secondary,
              fontWeight: 600,
              fontSize: "1.2rem",
              ":focus": {
                background: selectedRole === "volunteer" ? "#FFD15C" : "#E5E5E5",
              },
              ":active": {
                background: selectedRole === "volunteer" ? "#FFD15C" : "#E5E5E5",
              },
              ":hover": {
                background: selectedRole === "volunteer" ? "#FFD15C" : "#D0D0D0",
              },
              textTransform: "capitalize",
              textDecoration: "none",
              minWidth: "100%",
              borderRadius: "10px",
              marginBottom: "1rem",
              cursor: "pointer",
              flexDirection: "column",
              gap: "1rem",
              transition: "all 0.3s ease",
            },
            [theme.breakpoints.up("sm")]: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem",
              height: "150px",
              background: selectedRole === "volunteer" ? "#FFD15C" : "#E5E5E5",
              color: selectedRole === "volunteer" ? theme.palette.text.primary : theme.palette.text.secondary,
              fontWeight: 600,
              boxShadow: selectedRole === "volunteer" ? "0px 10px 20px rgba(0, 0, 0, 0.15)" : "none",
              fontSize: "1.2rem",
              ":focus": {
                background: selectedRole === "volunteer" ? "#FFD15C" : "#E5E5E5",
              },
              ":active": {
                background: selectedRole === "volunteer" ? "#FFD15C" : "#E5E5E5",
              },
              ":hover": {
                background: selectedRole === "volunteer" ? "#FFD15C" : "#D0D0D0",
              },
              textTransform: "capitalize",
              textDecoration: "none",
              borderRadius: "10px",
              marginBottom: "1rem",
              cursor: "pointer",
              flex: 1,
              flexDirection: "column",
              gap: "1rem",
              transition: "all 0.3s ease",
            },
          })}
        >
          <NextImage
            src="/undraw_team_collaboration.svg"
            alt="Volunteer Icon"
            width={48}
            height={48}
          />
          <Box textAlign="center">
            <Typography variant="h6" fontWeight={700} marginBottom="0.5rem">
              Volunteer
            </Typography>
            <Typography variant="body2" fontSize="0.9rem">
              Help others and make a difference
            </Typography>
          </Box>
        </Button>

        <Button
          onClick={() => handleRoleSelect("organization")}
          className={lato.className}
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "120px",
              background: selectedRole === "organization" ? "#FFD15C" : "#E5E5E5",
              color: selectedRole === "organization" ? theme.palette.text.primary : theme.palette.text.secondary,
              fontWeight: 600,
              fontSize: "1.2rem",
              ":focus": {
                background: selectedRole === "organization" ? "#FFD15C" : "#E5E5E5",
              },
              ":active": {
                background: selectedRole === "organization" ? "#FFD15C" : "#E5E5E5",
              },
              ":hover": {
                background: selectedRole === "organization" ? "#FFD15C" : "#D0D0D0",
              },
              textTransform: "capitalize",
              textDecoration: "none",
              minWidth: "100%",
              borderRadius: "10px",
              marginBottom: "1rem",
              cursor: "pointer",
              flexDirection: "column",
              gap: "1rem",
              transition: "all 0.3s ease",
            },
            [theme.breakpoints.up("sm")]: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem",
              height: "150px",
              background: selectedRole === "organization" ? "#FFD15C" : "#E5E5E5",
              color: selectedRole === "organization" ? theme.palette.text.primary : theme.palette.text.secondary,
              fontWeight: 600,
              boxShadow: selectedRole === "organization" ? "0px 10px 20px rgba(0, 0, 0, 0.15)" : "none",
              fontSize: "1.2rem",
              ":focus": {
                background: selectedRole === "organization" ? "#FFD15C" : "#E5E5E5",
              },
              ":active": {
                background: selectedRole === "organization" ? "#FFD15C" : "#E5E5E5",
              },
              ":hover": {
                background: selectedRole === "organization" ? "#FFD15C" : "#D0D0D0",
              },
              textTransform: "capitalize",
              textDecoration: "none",
              borderRadius: "10px",
              marginBottom: "1rem",
              cursor: "pointer",
              flex: 1,
              flexDirection: "column",
              gap: "1rem",
              transition: "all 0.3s ease",
            },
          })}
        >
          <NextImage
            src="/group220.svg"
            alt="Organization Icon"
            width={48}
            height={48}
          />
          <Box textAlign="center">
            <Typography variant="h6" fontWeight={700} marginBottom="0.5rem">
              Organization
            </Typography>
            <Typography variant="body2" fontSize="0.9rem">
              Create opportunities for others
            </Typography>
          </Box>
        </Button>
      </Box>

      <Button
        onClick={handleContinue}
        disabled={!selectedRole}
        className={lato.className}
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50px",
            background: selectedRole ? "#4CAF50" : "#E5E5E5",
            color: selectedRole ? "white" : theme.palette.text.secondary,
            fontWeight: 600,
            fontSize: "1.1rem",
            ":focus": {
              background: selectedRole ? "#4CAF50" : "#E5E5E5",
            },
            ":active": {
              background: selectedRole ? "#4CAF50" : "#E5E5E5",
            },
            ":hover": {
              background: selectedRole ? "#45a049" : "#E5E5E5",
            },
            ":disabled": {
              background: "#E5E5E5",
              color: theme.palette.text.secondary,
              cursor: "not-allowed",
            },
            textTransform: "capitalize",
            textDecoration: "none",
            minWidth: "200px",
            borderRadius: "8px",
            cursor: selectedRole ? "pointer" : "not-allowed",
            transition: "all 0.3s ease",
          },
          [theme.breakpoints.up("sm")]: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "14px 28px",
            height: "56px",
            background: selectedRole ? "#4CAF50" : "#E5E5E5",
            color: selectedRole ? "white" : theme.palette.text.secondary,
            fontWeight: 600,
            boxShadow: selectedRole ? "0px 10px 20px rgba(0, 0, 0, 0.15)" : "none",
            fontSize: "1.1rem",
            ":focus": {
              background: selectedRole ? "#4CAF50" : "#E5E5E5",
            },
            ":active": {
              background: selectedRole ? "#4CAF50" : "#E5E5E5",
            },
            ":hover": {
              background: selectedRole ? "#45a049" : "#E5E5E5",
            },
            ":disabled": {
              background: "#E5E5E5",
              color: theme.palette.text.secondary,
              cursor: "not-allowed",
            },
            textTransform: "capitalize",
            textDecoration: "none",
            borderRadius: "8px",
            cursor: selectedRole ? "pointer" : "not-allowed",
            width: "200px",
            transition: "all 0.3s ease",
          },
        })}
      >
        Continue
      </Button>
    </Box>
  );
}
