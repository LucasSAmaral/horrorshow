import * as React from "react";
import styled from "styled-components";
import { StyledLink } from "./styled-link";
import { StaticImage } from "gatsby-plugin-image";

const HeaderContent = ({ title }) => {
  return (
    <>
      <TitleWrapper>
        <StaticImage
          className="left-hand"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/blood-hand.png"
          height={88}
          quality={95}
          alt="Profile picture"
        />
        <h1 className="main-heading">{title}</h1>
      </TitleWrapper>
      <Menu>
        <StyledLink to="/">Início</StyledLink>
        <StyledLink to="/busca">Busca</StyledLink>
        <StyledLink to="/sobre-nos">Sobre nós</StyledLink>
      </Menu>
    </>
  );
};

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  h1 {
    margin-right: 89px;
  }

  .left-hand {
    overflow: visible;
  }

  img {
    filter: drop-shadow(6px -3px 2px rgba(0, 0, 0, 0.5));
  }

  @media (max-width: 375px) {
    h1 {
      margin-right: 0;
    }
    .left-hand {
      display: none;
    }
  }
`;

const Menu = styled.menu`
  padding: 0;
  margin: 0 auto;
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export default HeaderContent;
