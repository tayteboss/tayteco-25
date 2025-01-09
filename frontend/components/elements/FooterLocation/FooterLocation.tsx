import React, { useEffect, useState } from "react";
import styled from "styled-components";

const FooterLocationWrapper = styled.div`
  /* Add any wrapper styles here if needed */
`;

const Text = styled.p`
  color: var(--colour-grey);
`;

const FooterLocation: React.FC = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/London",
      });
      setTime(timeString);
    };

    // Initialize time on component mount
    updateTime();

    // Update every minute
    const timer = setInterval(updateTime, 60 * 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <FooterLocationWrapper>
      <Text>London</Text>
      <Text>{`${time} GMT`}</Text>
    </FooterLocationWrapper>
  );
};

export default FooterLocation;
