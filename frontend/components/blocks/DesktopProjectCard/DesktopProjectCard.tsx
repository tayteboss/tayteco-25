import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";

const DesktopProjectCardWrapper = styled.div`
  width: 100%;
  grid-column: 1 / 9;
  padding-top: 60%;
  position: relative;
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

type Props = {
  data: ProjectType[];
};

const DesktopProjectCard = (props: Props) => {
  const { data } = props;

  return (
    <DesktopProjectCardWrapper>
      <Inner></Inner>
    </DesktopProjectCardWrapper>
  );
};

export default DesktopProjectCard;
