import { UserContext } from "@/modules/context/user-context";
import { UserRole } from "@/modules/types/types";
import { logout } from "@/modules/services";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import PsychologyIcon from "@mui/icons-material/Psychology";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { Item } from "./Item";
import Modal from "../Modal";
import Portal from "@/HOC/modal-portal";

export type DrawerItem = {
  name: string;
  url: string;
  icon?: JSX.Element;
  action?: () => Promise<void>;
};

type TemporaryDrawerProps = {
  open: boolean;
  toggleDrawer: Dispatch<SetStateAction<boolean>>;
};

const notAuthenticatedUserMenuList: DrawerItem[] = [
  {
    name: "Volunteer now",
    url: "/initiatives",
  },
  { name: "Blog", url: "/blog" },
  { name: "About us", url: "/about-us" },
  { name: "Get in touch", url: "/contact-us" },
];

export const TemporaryDrawer = ({
  open,
  toggleDrawer,
}: TemporaryDrawerProps) => {
  const router = useRouter();
  const { isLogged, user } = useContext(UserContext) ?? {};
  const { setUser } = useContext(UserContext) ?? {};
  const [openModal, setIsOpen] = useState(false);

  const handleLogout = useCallback(async () => {
    const response = await logout();
    if (response) {
      localStorage.removeItem("match4action@tokens");
      localStorage.removeItem("match4action@user");
      setUser && setUser(null);
      toggleDrawer(false);
      router.push("/");
    }
  }, [router, setUser, toggleDrawer]);

  const setOpenModal = useCallback(async () => {
    setIsOpen((prev) => !prev);
  }, []);

  const authenticatedUserMenuList: DrawerItem[] = useMemo(
    () => [
      { name: "My profile", url: "/profile", icon: <PersonOutlineIcon /> },
      {
        name:
          user?.role === UserRole.volunteer
            ? "Volunteer now"
            : "Browse opportunities",
        url: "/initiatives",
      },
      ...(user?.role === UserRole.volunteer
        ? [
            { name: "Take test", url: "/test" },
            {
              name: "Recommended for you",
              url: "/recommended-initiatives",
              icon: <PsychologyIcon />,
            },
          ]
        : []),
      ...([UserRole.organization, UserRole.admin].includes(
        user?.role as UserRole
      )
        ? [
            {
              name: "Create initiative",
              url: "/create-initiative",
              icon: <CreateNewFolderOutlinedIcon />,
            },
            {
              name: "Owned initiatives",
              url: "/profile#owned-initiatives",
              icon: <AddCircleOutlineIcon />,
            },
            { name: "Application reports", url: "/reports" },
          ]
        : []),
      ...(user?.role === UserRole.admin
        ? [{ name: "Administration", url: "/admin" }]
        : []),
      {
        name: "Log out",
        url: "/",
        action: setOpenModal,
        icon: <ExitToAppIcon />,
      },
      { name: "Blog", url: "/blog" },
      { name: "About us", url: "/about-us" },
      { name: "Get in touch", url: "/contact-us" },
    ],
    [setOpenModal, user?.role]
  );

  const [blogUrl, setBlogUrl] = useState("https://medium.com/@info_66495");

  useEffect(() => {
    const baseURL = process.env.NEXT_PUBLIC_API_PATH || "http://localhost:3003";
    fetch(`${baseURL}/bloglink`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.data?.url) {
          setBlogUrl(data.data.url);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const drawer = useMemo(() => {
    const list = isLogged
      ? authenticatedUserMenuList
      : notAuthenticatedUserMenuList;
    const mappedList = list.map((item) =>
      item.name === "Blog" ? { ...item, url: blogUrl } : item
    );
    const bg = isLogged ? "#FFD15C" : "#FFFFFF";
    return {
      list: mappedList,
      bg,
    };
  }, [isLogged, authenticatedUserMenuList, blogUrl]);

  return (
    <Drawer open={open} anchor={"left"} onClose={() => toggleDrawer(false)}>
      <Box
        style={{ width: 305 }}
        onClick={() => toggleDrawer(false)}
        sx={{
          paddingTop: "2.5rem",
          height: "100%",
          background: drawer.bg,
        }}
      >
        {drawer?.list?.map((item, index) => (
          <Box key={item.name}>
            {item?.action ? (
              <Item data={item} />
            ) : (
              <NextLink
                href={item.url}
                target={item.name === "Blog" ? "_blank" : "_self"}
                style={{
                  textDecoration: "none",
                  fontSize: "0.875rem !important",
                }}
              >
                <Item data={item} />
              </NextLink>
            )}
          </Box>
        ))}
      </Box>

      {openModal ? (
        <Portal>
          <Modal
            modalTitle="Are you sure you want to log out?"
            firstButtonTitle="Yes"
            lastButtonTitle="Cancel"
            firstButtonFunction={() => {
              handleLogout();
            }}
            lastButtonFunction={() => {
              setIsOpen(!openModal);
            }}
          />
        </Portal>
      ) : (
        <></>
      )}
    </Drawer>
  );
};