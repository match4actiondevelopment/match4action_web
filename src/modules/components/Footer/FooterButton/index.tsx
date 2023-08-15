import { logout } from "@/modules/services";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import { useMediaQuery } from "@mui/material";
import NextLink from "next/link";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import theme from "@/modules/styles/theme";

export interface FooterButtonInterface {
  accessToken?: string;
}

export const FooterButton = ({ accessToken }: FooterButtonInterface) => {
  const pathname = usePathname();
  const doNotShowLoginButton = [
    "login",
    "register",
  ].includes(pathname as string);
  const isMobile = useMediaQuery(theme.breakpoints.down(1129), {
    noSsr: true,
  });

  const handleLogout = async () => {
    await logout();
    window.location.href = window.location.origin;
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          boxShadow: "none"
        }}
      >
        {!doNotShowLoginButton && !accessToken ? (
          <NextLink href="/login" style={{ textDecoration: "none" }}>
            <Button
              sx={(theme) => ({
                [theme.breakpoints.down(1130)]: {
                  minWidth: "328px",
                  background: "#525252",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "1rem",
                  borderRadius: "5px",
                  ":focus": {
                    background: "#525252",
                  },
                  ":active": {
                    background: "#525252",
                  },
                  ":hover": {
                    background: "#525252",
                  },
                  textTransform: "capitalize",
                },
                [theme.breakpoints.up(1130)]: {
                  minWidth: "200px",
                  minHeight: "60px",
                  background: "rgba(255, 209, 92, 1)",
                  color: "rgba(0, 0, 0, 1)",
                  fontWeight: 600,
                  fontSize: "1rem",
                  ":focus": {
                    background: "rgba(255, 209, 92, 1)",
                  },
                  ":active": {
                    background: "rgba(255, 209, 92, 1)",
                  },
                  ":hover": {
                    background: "rgba(255, 209, 92, 1)",
                  },
                  textTransform: "capitalize",
                },
              })}
            >
              Log In
              {isMobile ? (
                <></>
              ) : (
                <NextImage
                  style={{ marginLeft: "0.7rem" }}
                  alt="arrow right"
                  src="/arrow_right_black.svg"
                  width={18}
                  height={16} />
              )}
            </Button>
          </NextLink>
        ) : accessToken ? (
          <Button
            onClick={handleLogout}
            sx={(theme) => ({
              [theme.breakpoints.down(1130)]: {
                minWidth: "328px",
                background: "#525252",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: "1rem",
                borderRadius: "5px",
                ":focus": {
                  background: "#525252",
                },
                ":active": {
                  background: "#525252",
                },
                ":hover": {
                  background: "#525252",
                },
                textTransform: "capitalize",
              },
              [theme.breakpoints.up(1130)]: {
                minWidth: "200px",
                minHeight: "60px",
                background: "#525252",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: "1rem",
                borderRadius: "5px",
                ":focus": {
                  background: "#525252",
                },
                ":active": {
                  background: "#525252",
                },
                ":hover": {
                  background: "#525252",
                },
                textTransform: "capitalize",
              },
            })}
          >
            Log Out
            {isMobile ? (
              <></>
            ) : (
              <NextImage
                style={{ marginLeft: "0.7rem" }}
                alt="logout"
                src="/logout-white.svg"
                width={18}
                height={16} />
            )}
          </Button>
        ) : (
          <Box width="4rem" />
        )}

        <NextLink href="/register" style={{ textDecoration: "none" }}>
          <Button
            sx={(theme) => ({
              [theme.breakpoints.down(1130)]: {
                minWidth: "328px",
                background: "#FFFFFF",
                color: "#333333",
                fontWeight: 600,
                fontSize: "1rem",
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                ":focus": {
                  background: "#FFFFFF",
                },
                ":active": {
                  background: "#FFFFFF",
                },
                ":hover": {
                  background: "#FFFFFF",
                },
                textTransform: "capitalize",
              },
              [theme.breakpoints.up(1130)]: {
                minWidth: "200px",
                minHeight: "60px",
                background: "#000000",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: "1rem",
                ":focus": {
                  background: "#000000",
                },
                ":active": {
                  background: "#000000",
                },
                ":hover": {
                  background: "#000000",
                },
                textTransform: "capitalize",
              },
            })}
          >
            {isMobile ? (
              <>Sign Up</>
            ) : (
              <>
                Register
                <NextImage
                  style={{ marginLeft: "0.7rem" }}
                  alt="arrow right"
                  src="/arrow_right_white.svg"
                  width={18}
                  height={16} />
              </>
            )}
          </Button>
        </NextLink>
      </AppBar>
    </>
  );
};
