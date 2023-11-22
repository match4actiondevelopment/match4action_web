import { UserContext } from '@/modules/context/user-context';
import { logout } from '@/modules/services';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useCallback, useContext, useMemo, useState } from 'react';
import { Item } from './Item';
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
    name: 'Volunteer now',
    url: '/volunteer-now',
  },
  { name: 'Blog', url: '/blog' },
  { name: 'About us', url: '/about-us' },
  { name: 'Get in touch', url: '/get-in-touch' },
];

export const TemporaryDrawer = ({ open, toggleDrawer }: TemporaryDrawerProps) => {
  const router = useRouter();
  const { isLogged } = useContext(UserContext) ?? {};
  const { setUser } = useContext(UserContext) ?? {};
  const [openModal, setIsOpen] = useState(false);

  const handleLogout = useCallback(async () => {
    const response = await logout();
    if (response) {
      localStorage.removeItem('match4action@tokens');
      localStorage.removeItem('match4action@user');
      setUser && setUser(null);
      toggleDrawer(false);
      router.push('/');
    }
  }, []);

  const setOpenModal = useCallback(async () => {
    setIsOpen(!openModal)
  }, []);

  const authenticatedUserMenuList: DrawerItem[] = useMemo(
    () => [
      {
        name: 'My profile',
        url: '/profile',
        icon: (
          <PersonOutlineIcon
            sx={{
              fill: '#2C3235',
            }}
          />
        ),
      },
      {
        name: 'Create initiative',
        url: '/create',
        icon: (
          <CreateNewFolderOutlinedIcon
            sx={{
              fill: '#2C3235',
            }}
          />
        ),
      },
      {
        name: 'Favourite initiatives',
        url: '/favourite',
        icon: (
          <FavoriteBorderIcon
            sx={{
              fill: '#2C3235',
            }}
          />
        ),
      },
      {
        name: 'Owned initiatives',
        url: '/owned-initiatives',
        icon: (
          <AddCircleOutlineIcon
            sx={{
              fill: '#2C3235',
            }}
          />
        ),
      },
      {
        name: 'Contacted inititiatives',
        url: '/contacted-inititiatives',
        icon: (
          <BookmarkBorderIcon
            sx={{
              fill: '#2C3235',
            }}
          />
        ),
      },
      {
        name: 'Log out',
        url: '/',
        icon: (
          <ExitToAppIcon
            sx={{
              fill: '#2C3235',
            }}
          />
        ),
        action: setOpenModal,
      },
    ],
    []
  );

  const drawer = useMemo(() => {
    const list = isLogged ? authenticatedUserMenuList : notAuthenticatedUserMenuList;
    const bg = isLogged ? '#FFD15C' : '#FFFFFF';
    return {
      list,
      bg,
    };
  }, [isLogged]);

  return (
    <Drawer open={open} anchor={'left'} onClose={() => toggleDrawer(false)}>
      <Box
        style={{ width: 305 }}
        onClick={() => toggleDrawer(false)}
        sx={{
          paddingTop: '2.5rem',
          height: '100%',
          background: drawer.bg,
        }}
      >
        {drawer?.list?.map((item, index) => (
          <Box key={item.name}>
            {item?.action ? (
              <Item data={item} />
            ) : (
              <NextLink href={item.url} style={{ textDecoration: 'none', fontSize: '0.875rem !important' }}>
                <Item data={item} />
              </NextLink>
            )}
          </Box>
        ))}
      </Box>

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
    </Drawer>
  );
};
