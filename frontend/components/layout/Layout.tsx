import styled from "styled-components";
import { ReactNode } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { GoogleAnalytics } from "@next/third-parties/google";

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
      </ReactLenis>
    </>
  );
};

export default Layout;
