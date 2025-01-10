import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import { motion, useScroll, useTransform } from "framer-motion";
import router from "next/router";
import { useState, useRef, useEffect } from "react";

const ProjectsLayoutWrapper = styled(motion.div)`
  position: sticky;
  top: ${pxToRem(8)};
  z-index: 2;
  overflow: hidden;

  &:last-child {
    padding-bottom: 40vh;

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      padding-bottom: 50vh;
    }
  }
`;

const Inner = styled(motion.div)``;

interface Props {
  children: React.ReactNode;
  isReady: boolean;
}

const ProjectsLayout = (props: Props) => {
  const { children, isReady } = props;

  const [windowHeight, setWindowHeight] = useState(0);
  const [distanceToTop, setDistanceToTop] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const filter = useTransform(
    scrollY,
    [0, distanceToTop, distanceToTop + windowHeight * 0.9],
    ["brightness(1)", "brightness(1)", "brightness(0)"]
  );

  useEffect(() => {
    if (wrapperRef?.current) {
      setDistanceToTop(
        window.pageYOffset + wrapperRef.current.getBoundingClientRect().top
      );
    }

    setWindowHeight(window.innerHeight);

    const timer = setTimeout(() => {
      if (wrapperRef?.current) {
        setDistanceToTop(
          window.pageYOffset + wrapperRef.current.getBoundingClientRect().top
        );
      }

      setWindowHeight(window.innerHeight);
    }, 1000);

    return () => clearTimeout(timer);
  }, [distanceToTop, router]);

  return (
    <ProjectsLayoutWrapper
      ref={wrapperRef}
      className={`${isReady && "fade-in"}`}
    >
      <Inner style={{ filter }}>{children}</Inner>
    </ProjectsLayoutWrapper>
  );
};

export default ProjectsLayout;
