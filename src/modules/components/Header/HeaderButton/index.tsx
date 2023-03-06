import { UserContext } from '@/modules/context/user-context';
import { logout } from '@/modules/services';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';

export const HeaderButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const doNotShowLoginButton = ['forgot-password', 'login', 'register'].includes(pathname as string);
  const { user, setUser } = useContext(UserContext) ?? {}

  const handleLogout = async () => {
    const response = await logout()
    if (response) {
      localStorage.removeItem('match4action@tokens')
      localStorage.removeItem('match4action@user')
      setUser && setUser(null)
      router.push("/")
    }
  }

  return (
    <>
      {!doNotShowLoginButton && !user ? (
        <NextLink href="/login" style={{ textDecoration: 'none' }}>
          <Button
            sx={(theme) => ({
              [theme.breakpoints.down(1130)]: {
                background: '#FFD15C',
                color: '#000000',
                fontWeight: 400,
                fontSize: '0.75rem',
                ':focus': {
                  background: '#FFD15C',
                },
                ':active': {
                  background: '#FFD15C',
                },
                ':hover': {
                  background: '#FFD15C',
                },
                textTransform: 'capitalize',
              },
              [theme.breakpoints.up(1130)]: {
                background: '#FFD15C',
                color: '#000000',
                fontWeight: 400,
                fontSize: '1rem',
                ':focus': {
                  background: '#FFD15C',
                },
                ':active': {
                  background: '#FFD15C',
                },
                ':hover': {
                  background: '#FFD15C',
                },
                textTransform: 'capitalize',
              },
            })}
          >
            Log in
          </Button>
        </NextLink>
      ) : user && Object.keys(user).length > 0 ? (
        <Button
          onClick={handleLogout}
          sx={(theme) => ({
            [theme.breakpoints.down(1130)]: {
              background: '#FFD15C',
              color: theme.palette.text.primary,
              fontWeight: 400,
              fontSize: '0.75rem',
              ':focus': {
                background: '#FFD15C',
              },
              ':active': {
                background: '#FFD15C',
              },
              textTransform: 'capitalize',
            },
            [theme.breakpoints.up(1130)]: {
              background: '#FFD15C',
              color: theme.palette.text.primary,
              fontWeight: 400,
              fontSize: '1rem',
              ':focus': {
                background: '#FFD15C',
              },
              ':active': {
                background: '#FFD15C',
              },
              ':hover': {
                background: '#FFD15C',
              },
              textTransform: 'capitalize',
              padding: '0.4rem 1.25rem',
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
