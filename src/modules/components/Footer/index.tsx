import theme from "@/modules/styles/theme";
import { useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";

const FooterMobile = dynamic(
  () => import("../Footer/FooterMobile").then((doc) => doc.FooterMobile),
  {
    ssr: false,
  }
);

const FooterDesktop = dynamic(
  () => import("../Footer/FooterDesktop").then((doc) => doc.FooterDesktop),
  {
    ssr: false,
  }
);

export interface FooterInterface {
  accessToken?: string;
}

export const Footer = ({ accessToken }: FooterInterface) => {
  const isMobile = useMediaQuery(theme.breakpoints.down(1129), {
    noSsr: true,
  });

  return (
    <>
      {isMobile ? (
        <FooterMobile accessToken={accessToken} />
      ) : (
        <FooterDesktop accessToken={accessToken} />
      )}
    </>
  );
};
