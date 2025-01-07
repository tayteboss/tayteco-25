import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";
import MuxPlayer from "@mux/mux-player-react/lazy";
import NotchIcon from "../../svgs/NotchIcon";
import pxToRem from "../../../utils/pxToRem";
import ArrowIcon from "../../svgs/ArrowIcon";

const DesktopProjectCardWrapper = styled.div`
  width: 100%;
  grid-column: 1 / 9;
  padding-top: 60%;
  position: relative;

  &:hover {
    .project-card__information {
      opacity: 1;
    }
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

const InformationWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: ${pxToRem(8)} ${pxToRem(8)} ${pxToRem(8)} ${pxToRem(16)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  width: 100%;
  opacity: 0;

  transition: all var(--transition-speed-default) var(--transition-ease);
`;

const Title = styled.p`
  color: var(--colour-grey);
`;

const Button = styled.a`
  background: rgba(255, 255, 255, 0.1);
  color: var(--colour-white);
  padding: ${pxToRem(4)} ${pxToRem(8)};
  display: flex;
  align-items: center;
  text-decoration: none;
  border-radius: 2px;
  gap: ${pxToRem(6)};
`;

const NotchWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

type Props = {
  data: ProjectType;
};

const DesktopProjectCard = (props: Props) => {
  const { data } = props;

  return (
    <DesktopProjectCardWrapper>
      <Inner>
        <InformationWrapper className="project-card__information">
          <Title>
            <span>{data?.title || ""}</span> — {data?.description || ""}
          </Title>
          {data?.siteUrl && (
            <Button href={data?.siteUrl || ""}>
              View site
              <ArrowIcon />
            </Button>
          )}
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
            />
          )}
        </MediaWrapper>
      </Inner>
    </DesktopProjectCardWrapper>
  );
};

export default DesktopProjectCard;
