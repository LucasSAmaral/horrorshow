import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout posts={posts} location={location} title={siteTitle}>
      <Ol>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const usePoster = post.frontmatter.usePoster
          // const posterUrl = post.frontmatter.posterUrl

          return (
            <li key={post.fields.slug}>
              <article
                className={`post-list-item ${
                  usePoster ? "with-poster" : "no-poster"
                }`}
                itemScope
                itemType="http://schema.org/Article"
              >
                {usePoster && (
                  <GatsbyImage
                    image={getImage(post.frontmatter.posterImage)}
                    alt={post.frontmatter.posterImageAlt}
                  />
                )}
                <div>
                  <header>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <p>
                      <small>Texto por: {post.frontmatter.author}</small>
                    </p>
                    <p>
                      <small>Postado em: {post.frontmatter.date}</small>
                    </p>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </div>
              </article>
            </li>
          )
        })}
      </Ol>
    </Layout>
  )
}

const Ol = styled.ol`
  list-style: none;

  li {
    .with-poster {
      display: flex;
      gap: 15px;

      .gatsby-image-wrapper {
        overflow: visible;
      }

      img {
        width: auto;
        height: 188px;
      }
    }

    .no-poster {
      display: block;
    }
  }
`

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Todos os posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD/MM/YYYY")
          author
          title
          description
          usePoster
          posterUrl
          posterImageAlt
          posterImage {
            childImageSharp {
              gatsbyImageData(
                height: 188
                layout: FIXED
                blurredOptions: { width: 100 }
              )
            }
          }
        }
      }
    }
  }
`
