import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import DesktopProjectCard from "../DesktopProjectCard";
import MobileProjectCard from "../MobileProjectCard";
import { useEffect, useState } from "react";
import ProjectsLayout from "../../layout/ProjectsLayout";

type Props = {
  data: ProjectType[];
};

const Projects = (props: Props) => {
  const { data } = props;

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1000);
  }, []);

  return (
    <>
      {data.map((project, i) => (
        <ProjectsLayout key={i} isReady={isReady}>
          <LayoutWrapper>
            <LayoutGrid>
              <DesktopProjectCard data={project} />
              <MobileProjectCard data={project} />
            </LayoutGrid>
          </LayoutWrapper>
        </ProjectsLayout>
      ))}
    </>
  );
};

export default Projects;
