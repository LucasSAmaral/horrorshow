import * as React from "react"
import styled from "styled-components"
import { StyledLink } from "./styled-link"
import { StaticImage } from "gatsby-plugin-image"

const HeaderContent = ({ title }) => {
  return (
    <>
      <TitleWrapper>
        <StaticImage
          className="left-hand"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/blood-hand.png"
          width={88}
          height={88}
          quality={95}
          alt="Profile picture"
        />
        <h1 className="main-heading">{title}</h1>
        <StaticImage
          className="right-hand"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/blood-hand.png"
          width={88}
          height={88}
          quality={95}
          alt="Profile picture"
        />
      </TitleWrapper>
      <Menu>
        <StyledLink to="/">Início</StyledLink>
        <StyledLink to="/sobre">Sobre</StyledLink>
      </Menu>
    </>
  )
}

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  .right-hand {
    transform: scaleX(-1);
  }
`

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
