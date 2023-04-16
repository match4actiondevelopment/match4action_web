"use client";

import { Header } from "@/modules/components/Header";
import { CacheProvider } from "@emotion/react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { lato, sourceSerifPro } from "../styles/fonts";
import theme from "../styles/theme";
import createEmotionCache from "./createEmotionCache";
import { UserProvider } from "./user-context";

export interface LayoutContextProps {
  children: React.ReactNode;
  accessToken?: string;
}

export const queryClient = new QueryClient();

export const LayoutContext: React.FC<LayoutContextProps> = ({
  children,
  accessToken,
}) => {
  const [queryClientInstance] = useState(() => new QueryClient());
  const cache = createEmotionCache();
  return (
    <CacheProvider value={cache}>
      <QueryClientProvider client={queryClientInstance}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UserProvider>
            <Box
              className={sourceSerifPro.className + "" + lato.className}
              position="relative"
              sx={{
                overflowX: "hidden",
                height: "100%",
                minHeight: "100vh",
              }}
            >
              <Header accessToken={accessToken} />
              {children}
            </Box>
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
};
