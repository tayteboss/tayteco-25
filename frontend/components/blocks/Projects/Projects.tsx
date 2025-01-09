import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import DesktopProjectCard from "../DesktopProjectCard";
import MobileProjectCard from "../MobileProjectCard";
import { useState } from "react";
import pxToRem from "../../../utils/pxToRem";

const ProjectsWrapper = styled.section`
  margin-bottom: ${pxToRem(8)};
  position: sticky;
  top: ${pxToRem(8)};
  z-index: 2;
`;

type Props = {
  data: ProjectType[];
};

const Projects = (props: Props) => {
  const { data } = props;

  const [activeProject, setActiveProject] = useState(data[0]);

  return (
    <ProjectsWrapper>
      <LayoutWrapper>
        <LayoutGrid>
          <DesktopProjectCard data={activeProject} />
          <MobileProjectCard data={activeProject} />
        </LayoutGrid>
      </LayoutWrapper>
    </ProjectsWrapper>
  );
};

export default Projects;
