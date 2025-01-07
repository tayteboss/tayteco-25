import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const HOVER_SPACING = 14; // Adjust to your liking

interface ClockProps {
  // If you need extra props, add here
}

const ClockWrapper = styled.section<{ hovered: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 auto;
  height: 460px;
  width: 460px;
`;

interface HandContainerProps {
  rotation: number; // total rotation in degrees, can exceed 360
  hovered: boolean; // are we in the "hovered" (stacked) mode?
  offsetY: number; // vertical offset in stacked layout
  transitionDuration?: string;
  zIndex?: number;
  $isSecondHand?: boolean;
}

const HandContainer = styled.div<HandContainerProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: left center;
  z-index: ${(props) => props.zIndex || 1};
  transition: transform ${(props) => props.transitionDuration || "0.3s"}
    ease-in-out;
  color: ${(props) =>
    props.$isSecondHand ? "var(--colour-blue)" : "var(--colour-black)"};

  width: 240px;
  padding-left: 10px;

  /*
        - If not hovered: rotate around the clock
        - If hovered: vertical stack (translate up/down by offsetY)
    */
  transform: ${(props) =>
    props.hovered
      ? `translate(-50%, ${props.offsetY}px)`
      : // Subtract 90 so 0° is "12 o'clock" vs. "3 o'clock"
        `rotate(${props.rotation - 90}deg)`};
`;

interface LabelProps {
  hovered: boolean;
  rotation: number; // 0°..∞ for second hand, 0°..360 for hour/min
  label: string;
}

const HandLabel: React.FC<LabelProps> = ({ hovered, rotation, label }) => {
  // We'll flip if (rotation % 360) > 180 and we're not hovered
  const flipAngle = rotation % 360;
  const flip = flipAngle > 180 && !hovered;
  const transformValue = flip ? "rotate(180deg)" : "none";

  // Decide if we render an anchor or plain text
  let link: string | undefined;
  if (label === "@tayte.co") {
    link = "https://www.instagram.com/tayte.co/"; // link to Instagram
  } else if (label === "speakto@tayte.co") {
    link = "mailto:speakto@tayte.co"; // mailto link
  }

  const LabelWrapper = styled.div`
    transform: ${transformValue};
    transform-origin: center center;
    text-align: ${hovered ? "center" : flip ? "right" : "left"};
  `;

  // Render anchor if link is defined; otherwise just label
  const content = link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "inherit", textDecoration: "none" }}
      className="clock-link"
    >
      {label}
    </a>
  ) : (
    label
  );

  return <LabelWrapper>{content}</LabelWrapper>;
};

interface HandWithLabelProps {
  rotation: number; // 0°..∞ for second hand, 0°..360 for hour/min
  label: string;
  hovered: boolean;
  offsetY: number;
  zIndex?: number;
  transitionDuration?: string;
  isSecondHand?: boolean;
}

const HandWithLabel: React.FC<HandWithLabelProps> = ({
  rotation,
  label,
  hovered,
  offsetY,
  zIndex = 1,
  transitionDuration = "0.3s",
  isSecondHand = false,
}) => {
  return (
    <HandContainer
      rotation={rotation}
      hovered={hovered}
      offsetY={offsetY}
      zIndex={zIndex}
      transitionDuration={transitionDuration}
      $isSecondHand={isSecondHand}
    >
      <HandLabel hovered={hovered} rotation={rotation} label={label} />
    </HandContainer>
  );
};

const Clock: React.FC<ClockProps> = () => {
  const [time, setTime] = useState<Date>(new Date());
  const [hovered, setHovered] = useState<boolean>(false);

  // State for continuous second-hand rotation
  const [secondLoopCount, setSecondLoopCount] = useState<number>(0);
  // Track the previous `seconds` value to detect wrap from 59 -> 0
  const prevSecondRef = useRef<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const londonString = new Date().toLocaleString("en-GB", {
        timeZone: "Europe/London",
      });
      setTime(new Date(londonString));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  // Hour hand: standard 12-hour clock calculation
  const hourRotation = (hours % 12) * 30 + minutes * 0.5; // 0..360
  // Minute hand
  const minuteRotation = minutes * 6; // 0..360

  // Second hand: continuous; each loop adds 360
  // So after each full circle, angle keeps incrementing
  const secondRotation = secondLoopCount * 360 + seconds * 6; // can grow beyond 360

  return (
    <ClockWrapper
      hovered={hovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hour hand on top (z-index = 3) */}
      <HandWithLabel
        rotation={hourRotation}
        label="@tayte.co"
        hovered={hovered}
        offsetY={-HOVER_SPACING}
        zIndex={3}
        transitionDuration="0.3s"
      />

      {/* Minute hand in the middle (z-index = 2) */}
      <HandWithLabel
        rotation={minuteRotation}
        label="speakto@tayte.co"
        hovered={hovered}
        offsetY={0}
        zIndex={2}
        transitionDuration="0.3s"
      />

      {/* Second hand on bottom (z-index = 1) */}
      <HandWithLabel
        rotation={secondRotation}
        label="minimal intervention design & development"
        isSecondHand
        hovered={hovered}
        offsetY={HOVER_SPACING}
        zIndex={1}
        transitionDuration="0.3s"
      />
    </ClockWrapper>
  );
};

export default Clock;
