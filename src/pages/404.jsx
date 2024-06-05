import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout posts={posts} location={location} title={siteTitle}>
      <Wrapper>
        <h1>404: Nada pra ver aqui</h1>
        <StaticImage
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/blood-hand.png"
          quality={95}
          alt="Mancha de sangue em forma de mão"
        />
      </Wrapper>
    </Layout>
  )
}

export const Head = () => <Seo title="404" />

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    font-family: var(--title-font);
    color: var(--title-color);
    font-size: 55px;
    margin: 0 0 35px 0;
  }
`

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
  }
`
