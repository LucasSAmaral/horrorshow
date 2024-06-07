import * as React from "react";
import HeaderContent from "./header-content";
import styled from "styled-components";
import { StyledLink } from "./styled-link";

const recentPostsList = [...Array(3).keys()];

const shouldShowAside = pathName => {
  return !(
    pathName.includes("/author/") ||
    pathName.includes("/busca/") ||
    pathName.includes("/tag/")
  );
};

const Layout = ({ posts, location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  const showAside = shouldShowAside(location.pathname);

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        <HeaderContent title={title} />
      </header>

      <Wrapper>
        {showAside && (
          <Aside>
            {posts.length >= 3 && (
              <div>
                <h5>Posts mais recentes</h5>
                <ol>
                  {recentPostsList.map(postIndex => (
                    <li>
                      <StyledLink
                        to={posts?.[postIndex].fields.slug}
                        itemProp="url"
                      >
                        {posts?.[postIndex].frontmatter.title ||
                          posts?.[postIndex].fields.slug}
                      </StyledLink>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </Aside>
        )}

        <MainWrapper className={!showAside ? "wrapper-flex" : ""}>
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

  div {
    position: fixed;

    @media (max-width: 1180px) {
      position: inherit;
    }
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

const MainWrapper = styled.div`
  width: 100%;
  max-width: 900px;

  &.wrapper-flex {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 1180px) {
    display: flex;
    justify-content: center;
  }
`;

export default Layout;
