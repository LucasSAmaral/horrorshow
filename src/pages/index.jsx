import * as React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import styled from "styled-components";
import Poster from "../components/poster";
import { StyledLink } from "../components/styled-link";
import TagsComponent from "../components/tags-component";
import _ from "lodash";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Horrorshow`;
  const posts = data.allMarkdownRemark.nodes;

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
    );
  }

  return (
    <Layout posts={posts} location={location} title={siteTitle}>
      <Ol>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug;
          const usePoster = post.frontmatter.usePoster;
          const author = post.frontmatter.author;
          const tags = post.frontmatter.tags;

          const kebabCaseAuthor = _.kebabCase(author);

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
                  <Poster
                    posterUrl={post.frontmatter.posterUrl}
                    posterImage={post.frontmatter.posterImage}
                    posterImageAlt={post.frontmatter.posterImageAlt}
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
                      <small>
                        Texto por:{" "}
                        <Link
                          className="author-link"
                          to={`/author/${kebabCaseAuthor}`}
                        >
                          {author}
                        </Link>
                      </small>
                    </p>
                    <p>
                      <small>Postado em: {post.frontmatter.date}</small>
                    </p>
                  </header>

                  <TagsComponent tags={tags} />

                  <section>
                    <p itemProp="description">
                      {post.frontmatter.description || post.excerpt}{" "}
                    </p>
                    <p>
                      <StyledLink to={post.fields.slug} itemProp="url">
                        Leia +
                      </StyledLink>
                    </p>
                  </section>
                </div>
              </article>
            </li>
          );
        })}
      </Ol>
    </Layout>
  );
};

const Ol = styled.ol`
  list-style: none;

  li {
    .with-poster {
      display: flex;
      gap: 15px;

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 0 25px;
      }

      .gatsby-image-wrapper {
        overflow: visible;

        @media (max-width: 768px) {
          width: 100%;

          img {
            height: auto;
          }
        }
      }
    }

    .no-poster {
      display: block;

      @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 0 25px;
      }
    }
  }
`;

export default BlogIndex;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Todos os posts" />;

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
          tags
          usePoster
          posterUrl
          posterImageAlt
          posterImage {
            childImageSharp {
              gatsbyImageData(
                width: 188
                layout: FIXED
                blurredOptions: { width: 188 }
              )
            }
          }
        }
      }
    }
  }
`;
