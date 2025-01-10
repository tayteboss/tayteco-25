import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";
import MuxPlayer from "@mux/mux-player-react/lazy";
import NotchIcon from "../../svgs/NotchIcon";
import pxToRem from "../../../utils/pxToRem";

const DesktopProjectCardWrapper = styled.div`
  width: 100%;
  grid-column: 1 / 9;
  height: calc(60vh - 8px);
  position: relative;

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    height: calc(50vh - 8px);
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }
`;

const Inner = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--colour-black);
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    border-bottom-left-radius: 0;
    border-top-right-radius: 4px;
  }
`;

const MediaWrapper = styled.div`
  width: auto;
  height: 60%;
  position: relative;
  border-radius: 4px;
  overflow: hidden;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    height: 50%;
  }

  mux-player {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const InformationWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: ${pxToRem(8)} ${pxToRem(12)};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 2;
  width: 100%;
  opacity: 1;

  transition: all var(--transition-speed-default) var(--transition-ease);
`;

const Title = styled.p`
  color: var(--colour-grey);
`;

const NotchWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    top: -3px;

    svg {
      width: 70px;
    }
  }
`;

type Props = {
  data: ProjectType;
};

const DesktopProjectCard = (props: Props) => {
  const { data } = props;

  return (
    <DesktopProjectCardWrapper className="project-card">
      <Inner>
        <InformationWrapper className="project-card__information">
          <Title>
            <span>{data?.title || ""}</span> — {data?.description || ""}
          </Title>
        </InformationWrapper>
        <MediaWrapper>
          <NotchWrapper>
            <NotchIcon />
          </NotchWrapper>
          {data?.desktopMedia?.asset?.playbackId && (
            <MuxPlayer
              streamType="on-demand"
              playbackId={data.desktopMedia.asset.playbackId}
              autoPlay="muted"
              loop={true}
              thumbnailTime={1}
              loading="viewport"
              preload="auto"
              muted
              playsInline={true}
              style={{ aspectRatio: "1300/770" }}
            />
          )}
        </MediaWrapper>
      </Inner>
    </DesktopProjectCardWrapper>
  );
};

export default DesktopProjectCard;
