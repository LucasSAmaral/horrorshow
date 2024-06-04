import * as React from "react"
import styled from "styled-components"
import { StyledLink } from "./styled-link"

const HeaderContent = ({ title }) => {
  return (
    <>
      <h1 className="main-heading">{title}</h1>
      <Menu>
        <StyledLink to="/">Início</StyledLink>
        <StyledLink to="/sobre">Sobre</StyledLink>
      </Menu>
    </>
  )
}

const Menu = styled.menu`
  padding: 0;
  margin: 0 auto;
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: center;
  gap: 20px;
`

export default HeaderContent
