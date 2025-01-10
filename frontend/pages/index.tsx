import styled from "styled-components";
import { NextSeo } from "next-seo";
import {
  ProjectType,
  SiteSettingsType,
  TransitionsType,
} from "../shared/types/types";
import { motion } from "framer-motion";
import client from "../client";
import {
  projectsQueryString,
  siteSettingsQueryString,
} from "../lib/sanityQueries";
import Clock from "../components/blocks/Clock";
import Information from "../components/blocks/Information";
import Projects from "../components/blocks/Projects";

const PageWrapper = styled(motion.div)``;

type Props = {
  projects: ProjectType[];
  siteSettings: SiteSettingsType;
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { projects, siteSettings, pageTransitionVariants } = props;

  return (
    <PageWrapper
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <NextSeo
        title="Tayte.co — Minimal intervention design & development"
        description={siteSettings?.info || ""}
      />
      <Clock />
      <Projects data={projects.slice(0, 1)} />
      <Information siteSettings={siteSettings} />
      <Projects data={projects.slice(1)} />
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const siteSettings = await client.fetch(siteSettingsQueryString);
  const projects = await client.fetch(projectsQueryString);

  return {
    props: {
      siteSettings,
      projects,
    },
  };
}

export default Page;
