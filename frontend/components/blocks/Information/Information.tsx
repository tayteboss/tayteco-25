import styled from "styled-components";
import { SiteSettingsType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import Link from "next/link";
import formatHTML from "../../../utils/formatHTML";
import pxToRem from "../../../utils/pxToRem";
import FooterLocation from "../../elements/FooterLocation";
import FooterClock from "../../elements/FooterClock";

const InformationWrapper = styled.section`
  position: relative;
  z-index: 3;
`;

const Inner = styled.div`
  padding-top: ${pxToRem(8)};
`;

const Col = styled.div`
  grid-column: span 4;

  a {
    display: block;
    text-decoration: none;

    transition: all var(--transition-speed-default) var(--transition-ease);

    &:hover {
      opacity: 0.5;
    }
  }
`;

const ClockCol = styled.div`
  grid-column: span 4;
  display: flex;
  align-items: flex-end;
  gap: ${pxToRem(8)};
`;

const Text = styled.p<{ $useBlue?: boolean; $useMarginBottom?: boolean }>`
  color: ${(props) =>
    props.$useBlue ? "var(--colour-blue)" : "var(--colour-black)"};

  margin-bottom: ${(props) => (props.$useMarginBottom ? "16px" : "0")};
`;

const Copy = styled.p<{ $useBlue?: boolean; $useMarginBottom?: boolean }>`
  color: var(--colour-grey);
`;

const TextDiv = styled.div``;

const Top = styled.div`
  background: var(--colour-white);
  padding-bottom: ${pxToRem(240)};
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;

const Bottom = styled.div`
  padding-bottom: ${pxToRem(16)};

  .layout-grid {
    align-items: end;
  }
`;

type Props = {
  siteSettings: SiteSettingsType;
};

const Information = (props: Props) => {
  const { siteSettings } = props;

  return (
    <InformationWrapper>
      <LayoutWrapper>
        <Top>
          <LayoutWrapper>
            <Inner>
              <LayoutGrid>
                <Col>
                  <Text>tayte.co</Text>
                  <Text $useBlue={true}>
                    minimal intervention design & development
                  </Text>
                </Col>
                <Col>
                  <Link
                    href="https://www.instagram.com/tayte.co/"
                    target="_blank"
                  >
                    @tayte.co
                  </Link>
                  <Link href="mailto:speakto@tayte.co">speakto@tayte.co</Link>
                </Col>
                <Col>
                  <Text>— Info</Text>
                  {siteSettings?.info && (
                    <Text $useMarginBottom={true}>{siteSettings?.info}</Text>
                  )}
                  <Text>— Services</Text>
                  {siteSettings?.services && (
                    <TextDiv
                      dangerouslySetInnerHTML={{
                        __html: formatHTML(siteSettings?.services),
                      }}
                    />
                  )}
                </Col>
              </LayoutGrid>
            </Inner>
          </LayoutWrapper>
        </Top>
      </LayoutWrapper>
      <Bottom>
        <LayoutWrapper>
          <LayoutWrapper>
            <LayoutGrid>
              <ClockCol>
                <FooterClock />
                <FooterLocation />
              </ClockCol>
              <Col />
              <Col>
                <Copy>{new Date().getFullYear()} © tayte.co</Copy>
              </Col>
            </LayoutGrid>
          </LayoutWrapper>
        </LayoutWrapper>
      </Bottom>
    </InformationWrapper>
  );
};

export default Information;
