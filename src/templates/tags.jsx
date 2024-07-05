import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import RelatedPosts from "../components/related-posts";
import Seo from "../components/seo";
import Script from "../components/script";

const Tags = ({
  pageContext,
  data: {
    site,
    allMarkdownRemark: { totalCount, nodes: posts },
  },
  location,
}) => {
  const { tag } = pageContext;

  const siteTitle = site.siteMetadata?.title || `Horrorshow`;
  const social = site.siteMetadata?.social;

  const tagTitle = `${totalCount} ${
    totalCount === 1 ? "postagem" : "postagens"
  } marcada${totalCount === 1 ? "" : "s"} com "${tag}"`;

  return (
    <Layout posts={posts} location={location} title={siteTitle} social={social}>
      <RelatedPosts title={tagTitle} posts={posts} />
    </Layout>
  );
};

export const Head = ({ pageContext }) => {
  return (
    <>
      <Script />
      <Seo title={`Tag ${pageContext.tag}`} />;
    </>
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

export default Tags;

export const pageQuery = graphql`
  query ($tag: String) {
    site {
      siteMetadata {
        title
        social {
          instagram
          twitter
          tiktok
          youtube
        }
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
