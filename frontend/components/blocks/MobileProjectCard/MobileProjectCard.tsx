import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";
import MuxPlayer from "@mux/mux-player-react/lazy";
import NotchIcon from "../../svgs/NotchIcon";
import pxToRem from "../../../utils/pxToRem";
import ArrowIcon from "../../svgs/ArrowIcon";

const MobileProjectCardWrapper = styled.div`
  width: 100%;
  grid-column: 9 / -1;
  position: relative;
  height: 100%;
`;

const Inner = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--colour-black);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const MediaWrapper = styled.div`
  width: auto;
  height: 60%;
  position: relative;

  mux-player {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const NotchWrapper = styled.div`
  position: absolute;
  top: -2px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;

  svg {
    width: 70px;
    height: auto;
  }
`;

type Props = {
  data: ProjectType;
};

const MobileProjectCard = (props: Props) => {
  const { data } = props;

  return (
    <MobileProjectCardWrapper>
      <Inner>
        <MediaWrapper>
          <NotchWrapper>
            <NotchIcon />
          </NotchWrapper>
          {data?.mobileMedia?.asset?.playbackId && (
            <MuxPlayer
              streamType="on-demand"
              playbackId={data.mobileMedia.asset.playbackId}
              autoPlay="muted"
              loop={true}
              thumbnailTime={1}
              loading="viewport"
              preload="auto"
              muted
              playsInline={true}
            />
          )}
        </MediaWrapper>
      </Inner>
    </MobileProjectCardWrapper>
  );
};

export default MobileProjectCard;
