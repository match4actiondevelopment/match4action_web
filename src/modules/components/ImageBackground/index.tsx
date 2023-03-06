import theme from '@/modules/styles/theme';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { usePathname } from 'next/navigation';

export const ImageBackground = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down(1129), {
    noSsr: true,
  });

  return (
    <>
      {!isMobile && pathname === '/' && (
        <Box
          position="absolute"
          sx={{
            background: 'linear-gradient(136.74deg, #B577E1 6.64%, #554BBD 69.76%);',
            borderRadius: '40px',
            transform: 'rotate(-21.02deg)',
            width: '1233.4px;',
            height: '797.63px',
            left: '51%',
            top: '-11%',
            zIndex: -1,
          }}
        />
      )}
    </>
  );
};
