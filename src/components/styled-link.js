import styled from "styled-components"
import { Link } from "gatsby"

export const StyledLink = styled(Link)`
  font-family: var(--title-font);
  color: var(--title-color);
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: line-through;
  }
`
