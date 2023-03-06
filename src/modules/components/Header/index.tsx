'use client';

import theme from '@/modules/styles/theme';
import { useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';

const HeaderMobile = dynamic(() => import('../Header/HeaderMobile').then((doc) => doc.HeaderMobile), {
  ssr: false,
});

const HeaderDesktop = dynamic(() => import('../Header/HeaderDesktop').then((doc) => doc.HeaderDesktop), {
  ssr: false,
});

export const Header = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down(1129), {
    noSsr: true,
  });

  return <>{isMobile ? <HeaderMobile /> : <HeaderDesktop />}</>;
};
