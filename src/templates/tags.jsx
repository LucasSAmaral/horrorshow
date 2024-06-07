import * as React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import styled from "styled-components";
import { StyledLink } from "../components/styled-link";

const Tags = ({
  pageContext,
  data: {
    site,
    allMarkdownRemark: { totalCount, nodes: posts },
  },
  location,
}) => {
  const { tag } = pageContext;

  const siteTitle = site.siteMetadata?.title || `Title`;

  const tagHeader = `${totalCount} ${
    totalCount === 1 ? "postagem" : "postagens"
  } marcada${totalCount === 1 ? "" : "s"} com "${tag}"`;

  return (
    <Layout posts={posts} location={location} title={siteTitle}>
      <TagsWrapper>
        <h1>{tagHeader}</h1>

        <ul>
          {posts.map(post => {
            const { slug } = post.fields;
            const { title } = post.frontmatter;

            return (
              <article key={slug}>
                <header>
                  <h3>
                    <Link to={slug}>{title}</Link>
                  </h3>
                </header>
                <section>
                  <p>{post.frontmatter.description || post.excerpt}</p>
                  <StyledLink to={slug}>Leia +</StyledLink>
                </section>
              </article>
            );
          })}
        </ul>
      </TagsWrapper>
    </Layout>
  );
};

Tags.propTypes = {
  pageContext: PropTypes.shape({ tag: PropTypes.string.isRequired }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          frontmatter: PropTypes.shape({ title: PropTypes.string.isRequired }),
          fields: PropTypes.shape({ slug: PropTypes.string.isRequired }),
        })
      ).isRequired,
    }),
  }),
};

const TagsWrapper = styled.div`
  h1,
  h3 {
    font-family: var(--title-font);
    color: var(--title-color);
  }

  h3 {
    font-size: var(--fontSize-5);
  }

  p {
    margin: 0;
  }
`;

export default Tags;

export const pageQuery = graphql`
  query ($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: { slug: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      nodes {
        frontmatter {
          title
          description
          date
        }
        excerpt
        fields {
          slug
        }
      }
    }
  }
`;
