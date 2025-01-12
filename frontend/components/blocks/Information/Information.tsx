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
  position: sticky;
  top: 60vh;
  height: 40vh;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: -40vh;

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    height: 50vh;
    top: 50vh;
    margin-bottom: -50vh;
  }
`;

const Inner = styled.div`
  padding-top: ${pxToRem(8)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    .layout-grid {
      gap: ${pxToRem(16)};
    }
  }
`;

const Col = styled.div`
  grid-column: span 4;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }

  a {
    display: block;
    text-decoration: none;

    transition: all var(--transition-speed-default) var(--transition-ease);

    &:hover {
      opacity: 0.5;
    }
  }
`;

const ContactCol = styled.div`
  grid-column: span 4;
  margin-bottom: ${pxToRem(16)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }

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

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: span 2;
  }
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
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;

const Bottom = styled.div`
  padding-bottom: ${pxToRem(16)};
  height: 100%;
  background: var(--colour-white);
  display: flex;
  align-items: flex-end;
  width: 100%;

  .layout-grid {
    align-items: end;
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding-bottom: ${pxToRem(8)};

    .copyright {
      grid-column: span 2;
      text-align: right;
    }
  }
`;

const DesktopWrapper = styled.div`
  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

const MobileWrapper = styled.div`
  display: none;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: block;
  }
`;

const MobileCol = styled.div`
  grid-column: span 2;
`;

const FooterMobileClock = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: center;
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
                  {/* <Link
                    href="https://www.instagram.com/tayte.co/"
                    target="_blank"
                  >
                    @tayte.co
                  </Link>
                  <Link href="mailto:speakto@tayte.co">speakto@tayte.co</Link> */}
                </Col>
                <Col>
                  {siteSettings?.info && (
                    <>
                      <Text>— Info</Text>
                      <Text $useMarginBottom={true}>{siteSettings?.info}</Text>
                    </>
                  )}
                  <ContactCol>
                    <Text>— Contact</Text>
                    <Link
                      href="https://www.instagram.com/tayte.co/"
                      target="_blank"
                    >
                      @tayte.co
                    </Link>
                    <Link
                      href="mailto:speakto@tayte.co"
                      $useMarginBottom={true}
                    >
                      speakto@tayte.co
                    </Link>
                  </ContactCol>
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
            <DesktopWrapper>
              <LayoutGrid>
                <ClockCol>
                  <FooterClock />
                  <FooterLocation />
                </ClockCol>
                <Col />
                <Col className="copyright">
                  <Copy>{new Date().getFullYear()} © tayte.co</Copy>
                </Col>
              </LayoutGrid>
            </DesktopWrapper>
            <MobileWrapper>
              <LayoutGrid>
                <ClockCol>
                  <FooterLocation />
                </ClockCol>
                <FooterMobileClock>
                  <FooterClock />
                </FooterMobileClock>
                <MobileCol className="copyright">
                  <Copy>{new Date().getFullYear()} © tayte.co</Copy>
                </MobileCol>
              </LayoutGrid>
            </MobileWrapper>
          </LayoutWrapper>
        </LayoutWrapper>
      </Bottom>
    </InformationWrapper>
  );
};

export default Information;
