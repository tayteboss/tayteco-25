import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import { motion, useScroll, useTransform } from "framer-motion";
import useViewportWidth from "../../../hooks/useViewportWidth";

const HOVER_SPACING = 14; // Adjust to your liking

interface ClockProps {
  // If you need extra props, add here
}

const ClockWrapper = styled(motion.section)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 auto;
  height: 460px;
  width: 460px;
  margin-bottom: ${pxToRem(24)};

  @media ${(props) => props.theme.mediaBreakpoints.mobile} {
    height: 360px;
    width: 360px;
    overflow: hidden;
  }
`;

// NEW: Add a prop for `show` (opacity fade-in) in addition to your existing props
interface HandContainerProps {
  rotation: number; // total rotation in degrees, can exceed 360
  offsetY: number; // vertical offset in stacked layout
  transitionDuration?: string;
  zIndex?: number;
  $isSecondHand?: boolean;
  $show?: boolean; // new flag for showing/hiding (fading in)
}

const HandContainer = styled.div<HandContainerProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: left center;
  z-index: ${(props) => props.zIndex || 1};
  /* 
        NOTE: We add a comma so we can animate both transform and opacity
        This helps the second hand animate plus hour/minute fading in
    */
  transition:
    transform ${(props) => props.transitionDuration || "0.3s"} ease,
    opacity 0.6s ease-in-out;
  color: ${(props) =>
    props.$isSecondHand ? "var(--colour-blue)" : "var(--colour-black)"};
  width: 240px;
  padding-left: 10px;

  transform: ${(props) =>
    // Subtract 90 so 0° is "12 o'clock" vs. "3 o'clock"
    `rotate(${props.rotation - 90}deg)`};

  /* Fade in/out based on $show prop */
  opacity: ${(props) => (props.$show ? 1 : 0)};
`;

const LabelWrapper = styled.div<{ $transformValue?: string; flip?: boolean }>`
  transform: ${(props) => props.$transformValue || "none"};
  transform-origin: center center;

  @media ${(props) => props.theme.mediaBreakpoints.mobile} {
    font-size: 10px;
  }
`;

interface LabelProps {
  rotation: number; // 0°..∞ for second hand, 0°..360 for hour/min
  label: string;
  isSecondHand?: boolean;
}

const HandLabel: React.FC<LabelProps> = ({ rotation, label }) => {
  const flipAngle = rotation % 360;
  const flip = flipAngle > 180;
  const transformValue = flip ? "rotate(180deg)" : "none";

  useEffect(() => {}, [flip]);

  let link: string | undefined;
  if (label === "@tayte.co") {
    link = "https://www.instagram.com/tayte.co/";
  } else if (label === "speakto@tayte.co") {
    link = "mailto:speakto@tayte.co";
  }

  const content = link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "inherit",
        textDecoration: "none",
        textAlign: flip ? "right" : "left",
        display: "inline-block",
      }}
      className="clock-link"
    >
      {label}
    </a>
  ) : (
    label
  );

  return (
    <LabelWrapper
      $transformValue={transformValue}
      $flip={flip}
      className={flip ? "text-align-right" : "text-align-left"}
    >
      {content}
    </LabelWrapper>
  );
};
const SecondHandLabel: React.FC<LabelProps> = ({ rotation, label }) => {
  const LabelWrapper = styled.div`
    transform-origin: center center;
    text-align: "left";

    @media ${(props) => props.theme.mediaBreakpoints.mobile} {
      font-size: 10px;
    }
  `;

  return <LabelWrapper>{label}</LabelWrapper>;
};

interface HandWithLabelProps {
  rotation: number; // 0°..∞ for second hand, 0°..360 for hour/min
  label: string;
  offsetY: number;
  zIndex?: number;
  transitionDuration?: string;
  isSecondHand?: boolean;
  show?: boolean; // show or hide (for fade in)
}

const HandWithLabel: React.FC<HandWithLabelProps> = ({
  rotation,
  label,
  offsetY,
  zIndex = 1,
  transitionDuration = "0.3s",
  isSecondHand = false,
  show = true,
}) => {
  return (
    <HandContainer
      rotation={rotation}
      offsetY={offsetY}
      zIndex={zIndex}
      transitionDuration={transitionDuration}
      $isSecondHand={isSecondHand}
      $show={show}
    >
      {!isSecondHand && (
        <HandLabel
          rotation={rotation}
          label={label}
          isSecondHand={isSecondHand}
        />
      )}
      {isSecondHand && (
        <SecondHandLabel
          rotation={rotation}
          label={label}
          isSecondHand={isSecondHand}
        />
      )}
    </HandContainer>
  );
};

const Clock: React.FC<ClockProps> = () => {
  const [time, setTime] = useState<Date>(new Date());

  const [secondLoopCount, setSecondLoopCount] = useState<number>(0);
  const prevSecondRef = useRef<number>(0);

  // NEW: Track intro animation states
  const [introSecondHand, setIntroSecondHand] = useState<boolean>(true);
  const [showHourMinute, setShowHourMinute] = useState<boolean>(false);
  const [secondSpeedToSlow, setSecondSpeedToSlow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const londonString = new Date().toLocaleString("en-GB", {
        timeZone: "Europe/London",
      });
      console.log("Clock londonString", londonString);

      setTime(new Date(londonString));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Setup the “time check” for hour/min/sec
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // If we detect a wrap from e.g. 59 -> 0, increment loop counter
  useEffect(() => {
    if (seconds < prevSecondRef.current) {
      setSecondLoopCount((prev) => prev + 1);
    }
    prevSecondRef.current = seconds;
  }, [seconds]);

  // Standard calculations
  const hourRotation = (hours % 12) * 30 + minutes * 0.5; // 0..360
  const minuteRotation = minutes * 6; // 0..360
  const realSecondRotation = secondLoopCount * 360 + seconds * 6; // can grow beyond 360

  // NEW: For the first second, lock second hand to 3 o’clock (rotation=0),
  // then animate to the “real” rotation
  const displayedSecondRotation = introSecondHand ? 90 : realSecondRotation;

  // Once the component mounts, start a 1s timer
  // Then animate second hand from 3 o'clock to actual position.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroSecondHand(false);
      // Another small delay to let second hand transition finish
      // then fade in hour/minute
      setTimeout(() => {
        setSecondSpeedToSlow(false);
      }, 600);
      setTimeout(() => {
        setShowHourMinute(true);
      }, 1000);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Framer Motion for blurring as you scroll
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 700], ["blur(0px)", "blur(20px)"]);
  const transform = useTransform(
    scrollY,
    [0, 700],
    ["translateY(0px)", "translateY(400px)"]
  );

  const isMobile = useViewportWidth() === "mobile";

  return (
    <ClockWrapper style={{ filter: blur, transform: transform }}>
      {/* Hour hand (fade in after second hand intro is done) */}
      <HandWithLabel
        rotation={hourRotation}
        label="@tayte.co"
        offsetY={-HOVER_SPACING}
        zIndex={3}
        transitionDuration="0.3s"
        show={showHourMinute}
      />

      {/* Minute hand (fade in after second hand intro is done) */}
      <HandWithLabel
        rotation={minuteRotation}
        label="speakto@tayte.co"
        offsetY={0}
        zIndex={2}
        transitionDuration="0.3s"
        show={showHourMinute}
      />

      {/* Second hand (always shown; initially pinned to 3 o'clock, then animates) */}
      <HandWithLabel
        rotation={displayedSecondRotation}
        label={
          isMobile
            ? "minimal intervention design/dev"
            : "minimal intervention design & development"
        }
        isSecondHand={true}
        offsetY={HOVER_SPACING}
        zIndex={1}
        transitionDuration={secondSpeedToSlow ? "1s" : "0.1s"} // slightly longer to see the smooth movement
        show={true} // always shown
      />
    </ClockWrapper>
  );
};

export default Clock;
