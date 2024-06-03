import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const HeaderContent = ({isRootPath, title}) => {
if (isRootPath) {
  return (
    <h1 className="main-heading">
      <Link to="/">{title}</Link>
    </h1>
  )
}

return (
  <Link className="header-link-home" to="/">
    {title}
  </Link>
  )
};

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header"><HeaderContent title={title} isRootPath={isRootPath}/></header>
      <main>{children}</main>
      <Footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </Footer>
    </div>
  )
}

const Footer = styled.footer``;

export default Layout
