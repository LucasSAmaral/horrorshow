import * as React from "react"
import HeaderContent from "./header-content"
import styled from "styled-components"
import { StyledLink } from "./styled-link"

const recentPostsList = [...Array(3).keys()]

const Layout = ({ posts, location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        <HeaderContent title={title} />
      </header>

      <Wrapper>
        <Aside>
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
        </Aside>
        <MainWrapper>
          <main>{children}</main>
        </MainWrapper>
      </Wrapper>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;

  main {
    max-width: var(--maxWidth-wrapper);
  }
`

const Aside = styled.aside`
  position: relative;
  width: 150px;

  div {
    position: fixed;
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
`

const MainWrapper = styled.div`
  width: 100%;
  max-width: 900px;
`

export default Layout
