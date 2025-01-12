import React, { useEffect, useState } from "react";
import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";

interface FooterClockProps {
  timeZone?: string;
}

const FooterClockWrapper = styled.div`
  height: ${pxToRem(32)};
  width: ${pxToRem(32)};
  position: relative;
  border-radius: 50%;
`;

const Hand = styled.div`
  position: absolute;
  width: 1px;
  left: 50%;
  bottom: 50%;
  transform-origin: bottom;
`;

const HourHand = styled(Hand)`
  height: 20%;
  background: var(--colour-black);
`;

const MinuteHand = styled(Hand)`
  height: 33%;
  background: var(--colour-black);
`;

const SecondHand = styled(Hand)`
  height: 50%;
  background: var(--colour-blue);
  transition: transform 0.1s linear;
`;

const FooterClock: React.FC<FooterClockProps> = ({
  timeZone = "Europe/London",
}) => {
  // This will hold the “absolute” number of seconds that have elapsed
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const londonString = new Date().toLocaleString("en-GB", {
        timeZone: "Europe/London",
      });
      console.log("Footer londonString", londonString);

      setCurrentTime(new Date(londonString));

      // Increase total seconds by 1 each time
      setTotalSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeZone]);

  // Hours and minutes can remain on typical 12-hour cycles
  const seconds = currentTime.getSeconds();
  const minutes = currentTime.getMinutes();
  const hours = currentTime.getHours();

  // Keep hour and minute calculations the same
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hourDegrees = (hours % 12) * 30 + (minutes / 60) * 30;

  // secondHandDegrees: continuously increasing so it never “snaps” back
  const secondHandDegrees = currentTime.getSeconds() * 6;
  // If you do want to limit the rotation to 360, remove the transition or handle the jump at mod 360.

  return (
    <FooterClockWrapper>
      <HourHand style={{ transform: `rotate(${hourDegrees}deg)` }} />
      <MinuteHand style={{ transform: `rotate(${minuteDegrees}deg)` }} />
      <SecondHand style={{ transform: `rotate(${secondHandDegrees}deg)` }} />
    </FooterClockWrapper>
  );
};

export default FooterClock;
