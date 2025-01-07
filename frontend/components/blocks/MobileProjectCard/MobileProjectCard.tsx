import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";

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

type Props = {
  data: ProjectType;
};

const MobileProjectCard = (props: Props) => {
  const { data } = props;

  return (
    <MobileProjectCardWrapper>
      <Inner></Inner>
    </MobileProjectCardWrapper>
  );
};

export default MobileProjectCard;
