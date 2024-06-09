import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import RelatedPosts from "../components/related-posts";
import Seo from "../components/seo";

const Authors = ({
  pageContext,
  data: {
    site,
    allMarkdownRemark: { totalCount, nodes: posts },
  },
  location,
}) => {
  const { author } = pageContext;

  const siteTitle = site.siteMetadata?.title || `Horrorshow`;

  const authorTitle = `${totalCount} ${
    totalCount === 1 ? "postagem" : "postagens"
  } escrita${totalCount === 1 ? "" : "s"} por "${author}"`;

  return (
    <Layout posts={posts} location={location} title={siteTitle}>
      <RelatedPosts title={authorTitle} posts={posts} />
    </Layout>
  );
};

export const Head = ({pageContext}) => {
  return (
    <Seo
      title={`Autor ${pageContext.author}`}
    />
  );
};

Authors.propTypes = {
  pageContext: PropTypes.shape({ author: PropTypes.string.isRequired }),
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

export default Authors;

export const pageQuery = graphql`
  query ($author: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: { slug: DESC } }
      filter: { frontmatter: { author: { in: [$author] } } }
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
