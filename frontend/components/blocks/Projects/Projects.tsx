import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import DesktopProjectCard from "../DesktopProjectCard";
import MobileProjectCard from "../MobileProjectCard";
import { useState } from "react";

const ProjectsWrapper = styled.section``;

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
          <DesktopProjectCard data={data} />
          <MobileProjectCard data={activeProject} />
        </LayoutGrid>
      </LayoutWrapper>
    </ProjectsWrapper>
  );
};

export default Projects;
