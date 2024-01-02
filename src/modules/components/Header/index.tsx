import theme from "@/modules/styles/theme";
import { useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";

const HeaderMobile = dynamic(
  () => import("../Header/HeaderMobile").then((doc) => doc.HeaderMobile),
  {
    ssr: false,
  }
);

const HeaderDesktop = dynamic(
  () => import("../Header/HeaderDesktop").then((doc) => doc.HeaderDesktop),
  {
    ssr: false,
  }
);

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
