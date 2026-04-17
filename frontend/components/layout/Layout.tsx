import styled from "styled-components";
import { ReactNode } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const Main = styled.main``;

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;

  const lenis = useLenis(({ scroll }) => {});

  return (
    <>
      <ReactLenis root>
        <Main>{children}</Main>
        <GoogleAnalytics gaId="G-DP3TM6BRKT" />
        <SpeedInsights />
      </ReactLenis>
    </>
  );
};

export default Layout;
