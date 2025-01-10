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

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
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
  border-radius: 4px;
  overflow: hidden;

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

const InformationWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: ${pxToRem(8)};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 2;
  width: 100%;
  opacity: 1;

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

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    background: rgba(255, 255, 255, 1);
    color: var(--colour-black);

    svg {
      path {
        stroke: var(--colour-black);
      }
    }
  }

  svg {
    path {
      transition: all var(--transition-speed-default) var(--transition-ease);
    }
  }
`;

type Props = {
  data: ProjectType;
};

const MobileProjectCard = (props: Props) => {
  const { data } = props;

  return (
    <MobileProjectCardWrapper className="project-card">
      <Inner>
        <InformationWrapper className="project-card__information">
          {data?.siteUrl && (
            <Button href={data?.siteUrl || ""}>
              Visit site
              <ArrowIcon />
            </Button>
          )}
        </InformationWrapper>
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
