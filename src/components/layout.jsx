import * as React from "react";
import HeaderContent from "./header-content";
import styled from "styled-components";
import { StyledLink } from "./styled-link";
import { StaticImage } from "gatsby-plugin-image";

const recentPostsList = [...Array(3).keys()];

const shouldShowRecentPosts = pathName => {
  return !(
    pathName.includes("/author/") ||
    pathName.includes("/busca/") ||
    pathName.includes("/tag/")
  );
};

const Layout = ({ posts, location, title, social, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  const showRecentPosts = shouldShowRecentPosts(location.pathname);

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        <HeaderContent title={title} />
      </header>

      <Wrapper>
        <Aside>
          <AsideContainer>
            <SocialNetworks>
              <h5>Nos siga nas redes sociais</h5>
              <ol>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={social?.instagram || ""}
                    onClick={() =>
                      window.gtag("event", "click_on_social_network_instagram")
                    }
                  >
                    <StaticImage
                      layout="fixed"
                      formats={["auto", "webp", "avif"]}
                      src="../images/instagram-icon.png"
                      quality={95}
                      width={30}
                      alt="ícone do instagram"
                      title="Nos siga no Instagram"
                    />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={social?.twitter || ""}
                    onClick={() =>
                      window.gtag("event", "click_on_social_network_twitter")
                    }
                  >
                    <StaticImage
                      layout="fixed"
                      formats={["auto", "webp", "avif"]}
                      src="../images/x-icon.png"
                      quality={95}
                      width={30}
                      alt="ícone do X (Twitter)"
                      title="Nos siga no X (Twitter)"
                    />
                    X (Twitter)
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={social?.tiktok || ""}
                    onClick={() =>
                      window.gtag("event", "click_on_social_network_tiktok")
                    }
                  >
                    <StaticImage
                      layout="fixed"
                      formats={["auto", "webp", "avif"]}
                      src="../images/tiktok.png"
                      quality={95}
                      width={30}
                      alt="ícone do TikTok"
                      title="Nos siga no TikTok"
                    />
                    TikTok
                  </a>
                </li>
              </ol>
            </SocialNetworks>
            {posts.length >= 3 && showRecentPosts && (
              <RecentPosts>
                <h5>Posts mais recentes</h5>
                <ol>
                  {recentPostsList.map(postIndex => (
                    <li>
                      <StyledLink
                        to={posts?.[postIndex].fields.slug}
                        itemProp="url"
                        onClick={() =>
                          window.gtag(
                            "event",
                            `click_on_${
                              posts?.[postIndex].frontmatter.title ||
                              posts?.[postIndex].fields.slug
                            }`,
                            {
                              clickedLink:
                                posts?.[postIndex].frontmatter.title ||
                                posts?.[postIndex].fields.slug,
                            }
                          )
                        }
                      >
                        {posts?.[postIndex].frontmatter.title ||
                          posts?.[postIndex].fields.slug}
                      </StyledLink>
                    </li>
                  ))}
                </ol>
              </RecentPosts>
            )}
          </AsideContainer>
        </Aside>

        <MainWrapper>
          <main>{children}</main>
        </MainWrapper>
      </Wrapper>
      <footer>© Horrorshow {new Date().getFullYear()}</footer>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;

  @media (max-width: 1180px) {
    flex-direction: column;
    align-items: center;
  }

  main {
    max-width: var(--maxWidth-wrapper);

    @media (max-width: 1180px) {
      max-width: 625px;
    }
  }
`;

const Aside = styled.aside`
  position: relative;
  width: 150px;

  @media (max-width: 1180px) {
    width: auto;
    text-align: center;
  }

  h5 {
    font-family: var(--title-font);
    color: var(--title-color);
    font-size: 30px;
    text-decoration: underline;
    margin: 0;
  }

  ol {
    list-style: none;

    li {
      a {
        color: #fafafa;
      }
    }
  }
`;

const AsideContainer = styled.div`
  position: fixed;

  @media (max-width: 1180px) {
    position: inherit;
  }
`;

const SocialNetworks = styled.div`
  margin-bottom: 15px;

  a {
    display: flex;
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--title-font);
    font-size: 24px;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: line-through;
    }

    @media (max-width: 1180px) {
      justify-content: center;
    }
  }
`;

const RecentPosts = styled.div``;

const MainWrapper = styled.div`
  width: 100%;
  max-width: 900px;

  @media (max-width: 1180px) {
    display: flex;
    justify-content: center;
  }
`;

export default Layout;
