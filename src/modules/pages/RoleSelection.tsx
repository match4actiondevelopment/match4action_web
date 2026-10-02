"use client";

import {
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import NextImage from "next/image";
import NextLink from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../context/user-context";
import {
  getCurrentAccount,
  PublicRole,
  saveAccountRole,
} from "../services/account";
import { UserI } from "../types/types";
import {
  lato,
  sourceSerifPro,
} from "../styles/fonts";

const choices: {
  role: PublicRole;
  label: string;
  image: string;
}[] = [
  {
    role: "volunteer",
    label: "Volunteer",
    image: "/undraw_team_collaboration.svg",
  },
  {
    role: "organization",
    label: "Organisation",
    image: "/group220.svg",
  },
];

export default function RoleSelection() {
  const context = useContext(UserContext);
  const setUser = context?.setUser;
  const queryClient = useQueryClient();

  const [account, setAccount] =
    useState<UserI | null>(null);

  const [selected, setSelected] =
    useState<PublicRole | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    setLoading(true);
    setError("");

    getCurrentAccount(controller.signal)
      .then((user) => {
        if (!active) return;

        setAccount(user);
        setUser?.(user);

        if (
          user.role === "volunteer" ||
          user.role === "organization"
        ) {
          setSelected(user.role);
        }
      })
      .catch((failure: unknown) => {
        if (!active) return;

        setError(
          failure instanceof Error
            ? failure.message
            : "Could not load your account."
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [attempt, setUser]);

  async function handleContinue() {
    if (!selected || saving) return;

    setSaving(true);
    setError("");

    try {
      const user = await saveAccountRole(selected);

      setUser?.(user);

      queryClient.setQueryData(
        ["profile", user._id],
        user
      );

      // Refresh menus that read the stored user.
      try {
        localStorage.setItem(
          "match4action@user",
          JSON.stringify(user)
        );
      } catch {}

      window.location.assign("/profile");
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "Could not save your role."
      );

      setSaving(false);
    }
  }

  return (
    <Box
      component="main"
      sx={{
        maxWidth: 600,
        mx: "auto",
        my: 5,
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h2"
        className={sourceSerifPro.className}
        sx={{
          fontSize: {
            xs: "1.75rem",
            sm: "2.5rem",
          },
          fontWeight: 700,
          mb: 3,
        }}
      >
        Select how you want to act
      </Typography>

      {loading ? (
        <CircularProgress
          aria-label="Loading your account"
        />
      ) : !account ? (
        <>
          <Alert severity="error">
            {error ||
              "Please log in to choose your role."}
          </Alert>

          <Button
            onClick={() =>
              setAttempt((value) => value + 1)
            }
          >
            Retry
          </Button>

          <Button
            component={NextLink}
            href="/login"
          >
            Log in
          </Button>
        </>
      ) : account.role === "admin" || account.roleSelectionPending !== true ? (
        <>
          <Alert severity="info">
            Your account role has already been selected.
          </Alert>

          <Button
            component={NextLink}
            href="/profile"
          >
            Back to profile
          </Button>
        </>
      ) : (
        <>
          <Typography
            className={lato.className}
            sx={{ mb: 3 }}
          >
            Choose Volunteer to apply for
            opportunities, or Organisation to post
            them.
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          )}

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            {choices.map((choice) => (
              <Button
                key={choice.role}
                onClick={() =>
                  setSelected(choice.role)
                }
                disabled={saving}
                aria-pressed={
                  selected === choice.role
                }
                sx={{
                  flex: 1,
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  color: "text.primary",
                  border: "2px solid",
                  borderColor:
                    selected === choice.role
                      ? "#FFD15C"
                      : "#ddd",
                  bgcolor:
                    selected === choice.role
                      ? "#FFF3CE"
                      : "#f5f5f5",
                }}
              >
                <NextImage
                  src={choice.image}
                  alt=""
                  width={180}
                  height={140}
                />

                {choice.label}
              </Button>
            ))}
          </Box>

          <Button
            variant="contained"
            disabled={!selected || saving}
            onClick={handleContinue}
            sx={{ mt: 3, px: 5 }}
          >
            {saving
              ? "Saving…"
              : "Save and continue"}
          </Button>
        </>
      )}
    </Box>
  );
}