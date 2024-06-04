import * as React from "react"
import HeaderContent from "./header-content"
import styled from "styled-components"
import { StyledLink } from "./styled-link"

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
              <li>
                <StyledLink to={posts?.[0].fields.slug} itemProp="url">
                  {posts?.[0].frontmatter.title || posts?.[0].fields.slug}
                </StyledLink>
              </li>
              <li>
                <StyledLink to={posts?.[1].fields.slug} itemProp="url">
                  {posts?.[1].frontmatter.title || posts?.[1].fields.slug}
                </StyledLink>
              </li>
              <li>
                <StyledLink to={posts?.[2].fields.slug} itemProp="url">
                  {posts?.[2].frontmatter.title || posts?.[2].fields.slug}
                </StyledLink>
              </li>
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
  }
`

const MainWrapper = styled.div`
  width: 100%;
  max-width: 900px;
`

export default Layout
