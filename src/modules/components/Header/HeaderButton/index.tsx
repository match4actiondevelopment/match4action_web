import { UserContext } from "@/modules/context/user-context";
import { logout } from "@/modules/services";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useContext, useMemo, useState } from "react";

export interface HeaderButtonInterface {
  accessToken?: string;
}

export const HeaderButton = ({ accessToken }: HeaderButtonInterface) => {
  const pathname = usePathname();
  const { user, isLogged, setUser } = useContext(UserContext) ?? {};
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const doNotShowLoginButton = [
    "forgot-password",
    "login",
    "register",
  ].includes(pathname as string);

  const handleLogout = async () => {
    await logout();
    setUser?.(null);
    window.location.href = window.location.origin;
  };

  const userImage = useMemo(() => user?.image || "/default-user.svg", [user]);
  const userAlt = useMemo(() => user?.name || "User avatar", [user]);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => setAnchorEl(null);

  if (!doNotShowLoginButton && !accessToken && !isLogged) {
    return (
      <NextLink href="/login" style={{ textDecoration: "none" }}>
        <Button
          sx={(theme) => ({
            [theme.breakpoints.down(1130)]: {
              background: "#FFD15C",
              color: "#000000",
              fontWeight: 400,
              fontSize: "0.75rem",
              ":focus": { background: "#FFD15C" },
              ":active": { background: "#FFD15C" },
              ":hover": { background: "#FFD15C" },
              textTransform: "capitalize",
            },
            [theme.breakpoints.up(1130)]: {
              background: "#FFD15C",
              color: "#000000",
              fontWeight: 400,
              fontSize: "1rem",
              ":focus": { background: "#FFD15C" },
              ":active": { background: "#FFD15C" },
              ":hover": { background: "#FFD15C" },
              textTransform: "capitalize",
            },
          })}
        >
          Log in
        </Button>
      </NextLink>
    );
  }

  if (accessToken || isLogged) {
    return (
      <>
        <IconButton onClick={handleOpenMenu} sx={{ p: 0 }} aria-label="user menu">
          <Avatar alt={userAlt} src={userImage} sx={{ width: 36, height: 36 }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{ sx: { bgcolor: "#FFD15C" } }}
        >
          <NextLink href="/profile" style={{ textDecoration: "none", color: "inherit" }}>
            <MenuItem onClick={handleCloseMenu}>
              <ListItemIcon>
                <PersonOutlineIcon sx={{ fill: "#2C3235" }} />
              </ListItemIcon>
              <ListItemText primary="My profile" />
            </MenuItem>
          </NextLink>
          <NextLink href="/favourite" style={{ textDecoration: "none", color: "inherit" }}>
            <MenuItem onClick={handleCloseMenu}>
              <ListItemIcon>
                <FavoriteBorderIcon sx={{ fill: "#2C3235" }} />
              </ListItemIcon>
              <ListItemText primary="Favorite initiatives" />
            </MenuItem>
          </NextLink>
          <NextLink href="/owned-initiatives" style={{ textDecoration: "none", color: "inherit" }}>
            <MenuItem onClick={handleCloseMenu}>
              <ListItemIcon>
                <AddCircleOutlineIcon sx={{ fill: "#2C3235" }} />
              </ListItemIcon>
              <ListItemText primary="Owned initiatives" />
            </MenuItem>
          </NextLink>
          <NextLink href="/contacted-inititiatives" style={{ textDecoration: "none", color: "inherit" }}>
            <MenuItem onClick={handleCloseMenu}>
              <ListItemIcon>
                <BookmarkBorderIcon sx={{ fill: "#2C3235" }} />
              </ListItemIcon>
              <ListItemText primary="Contacted initiatives" />
            </MenuItem>
          </NextLink>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon sx={{ fill: "#2C3235" }} />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </MenuItem>
        </Menu>
      </>
    );
  }

  return <Box width="4rem" />;
};
