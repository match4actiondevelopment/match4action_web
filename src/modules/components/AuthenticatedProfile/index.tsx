"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import NextLink from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { UserContext } from "@/modules/context/user-context";
import { http } from "@/modules/config/http";
import Profile from "@/modules/pages/Profile";
import {
  RequestInterface,
  UserI,
} from "@/modules/types/types";

export default function AuthenticatedProfile() {
  const context = useContext(UserContext);
  const setUser = context?.setUser;
  const queryClient = useQueryClient();

  const [userId, setUserId] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function verifySession() {
      setLoading(true);
      setError("");
      setNeedsLogin(false);
      setUserId(undefined);

      try {
        // Handle session errors here instead of using the shared
        // interceptor, which redirects 403 responses to the homepage.
        const { data } = await axios.post<
          RequestInterface<UserI>
        >(
          "/users/profile",
          {},
          {
            baseURL: http.defaults.baseURL,
            withCredentials: true,
            signal: controller.signal,
          }
        );

        if (!active) return;

        if (!data.success || !data.data?._id) {
          throw new Error("Invalid profile response.");
        }

        queryClient.setQueryData(
          ["profile", data.data._id],
          data.data
        );

        setUser?.(data.data);
        setUserId(data.data._id);
      } catch (failure) {
        if (!active || axios.isCancel(failure)) return;

        const status = axios.isAxiosError(failure)
          ? failure.response?.status
          : undefined;

        if (status === 401 || status === 403) {
          setUser?.(null);
          setNeedsLogin(true);
        } else {
          setError(
            "Could not load your profile. Please try again."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void verifySession();

    return () => {
      active = false;
      controller.abort();
    };
  }, [attempt, queryClient, setUser]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 6,
        }}
      >
        <CircularProgress
          aria-label="Checking your session"
        />
      </Box>
    );
  }

  if (needsLogin) {
    return (
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          my: 4,
          px: 2,
        }}
      >
        <Alert severity="info">
          Please log in to view your profile.
        </Alert>

        <Button
          component={NextLink}
          href="/login"
          sx={{ mt: 2 }}
        >
          Log in
        </Button>
      </Box>
    );
  }

  if (error || !userId) {
    return (
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          my: 4,
          px: 2,
        }}
      >
        <Alert
          severity="error"
          action={
            <Button
              onClick={() =>
                setAttempt((value) => value + 1)
              }
            >
              Retry
            </Button>
          }
        >
          {error || "Could not load your profile."}
        </Alert>
      </Box>
    );
  }

  return <Profile userId={userId} />;
}