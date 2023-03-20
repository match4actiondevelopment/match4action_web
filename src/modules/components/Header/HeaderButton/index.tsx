import { logout } from "@/modules/services";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export interface HeaderButtonInterface {
  accessToken?: string;
}

export const HeaderButton = ({ accessToken }: HeaderButtonInterface) => {
  const pathname = usePathname();
  const doNotShowLoginButton = [
    "forgot-password",
    "login",
    "register",
  ].includes(pathname as string);

  const handleLogout = async () => {
    await logout();
    window.location.href = window.location.origin;
  };

  return (
    <>
      {!doNotShowLoginButton && !accessToken ? (
        <NextLink href="/login" style={{ textDecoration: "none" }}>
          <Button
            sx={(theme) => ({
              [theme.breakpoints.down(1130)]: {
                background: "#FFD15C",
                color: "#000000",
                fontWeight: 400,
                fontSize: "0.75rem",
                ":focus": {
                  background: "#FFD15C",
                },
                ":active": {
                  background: "#FFD15C",
                },
                ":hover": {
                  background: "#FFD15C",
                },
                textTransform: "capitalize",
              },
              [theme.breakpoints.up(1130)]: {
                background: "#FFD15C",
                color: "#000000",
                fontWeight: 400,
                fontSize: "1rem",
                ":focus": {
                  background: "#FFD15C",
                },
                ":active": {
                  background: "#FFD15C",
                },
                ":hover": {
                  background: "#FFD15C",
                },
                textTransform: "capitalize",
              },
            })}
          >
            Log in
          </Button>
        </NextLink>
      ) : accessToken ? (
        <Button
          onClick={handleLogout}
          sx={(theme) => ({
            [theme.breakpoints.down(1130)]: {
              background: "#FFD15C",
              color: "#000000",
              fontWeight: 400,
              fontSize: "0.75rem",
              ":focus": {
                background: "#FFD15C",
              },
              ":active": {
                background: "#FFD15C",
              },
              ":hover": {
                background: "#FFD15C",
              },
              textTransform: "capitalize",
            },
            [theme.breakpoints.up(1130)]: {
              background: "#FFD15C",
              color: "#000000",
              fontWeight: 400,
              fontSize: "1rem",
              ":focus": {
                background: "#FFD15C",
              },
              ":active": {
                background: "#FFD15C",
              },
              ":hover": {
                background: "#FFD15C",
              },
              textTransform: "capitalize",
            },
          })}
        >
          Log out
        </Button>
      ) : (
        <Box width="4rem" />
      )}
    </>
  );
};
