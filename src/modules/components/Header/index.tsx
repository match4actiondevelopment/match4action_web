import { HeaderDesktop } from "@/modules/components/Header/HeaderDesktop";
import { HeaderMobile } from "@/modules/components/Header/HeaderMobile";
import theme from "@/modules/styles/theme";
import { useMediaQuery } from "@mui/material";

export interface HeaderInterface {
  accessToken?: string;
}

export const Header = ({ accessToken }: HeaderInterface) => {
  const isMobile = useMediaQuery(theme.breakpoints.down(1129), {
    noSsr: true,
  });

  return (
    <>
      {isMobile ? (
        <HeaderMobile accessToken={accessToken} />
      ) : (
        <HeaderDesktop accessToken={accessToken} />
      )}
    </>
  );
};
