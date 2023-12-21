import { logout } from "@/modules/services";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import Modal from "../../Modal";
import Portal from "@/HOC/modal-portal";
import Image from "next/image";
import { UserContext } from "@/modules/context/user-context";



export const HeaderButton = () => {
  const pathname = usePathname();
  const { user, setUser, isLogged } = useContext(UserContext) ?? {};

  const doNotShowLoginButton = [
    "forgot-password",
    "login",
    "register",
  ].includes(pathname as string);

  const [openModal, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setUser && setUser(null)
    window.location.href = window.location.origin;
  };

  return (
    <>
      {!doNotShowLoginButton && !isLogged ? (
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
      ) : isLogged ? (
        <>
          <Image
            onClick={() => setIsOpen(!openModal)}
            alt="profile-image"
            src={user?.image ?? "default-user.svg"}
            width={36}
            height={36}
          />

          {openModal ?
            <Portal>
              <Modal
                modalTitle="Are you sure you want to log out?"
                firstButtonTitle="Yes"
                lastButtonTitle="Cancel"
                firstButtonFunction={() => { handleLogout() }}
                lastButtonFunction={() => { setIsOpen(!openModal) }}
              />
            </Portal> :
            <></>
          }
        </>
      ) : (
        <Box width="4rem" />
      )}
    </>
  );
};
