import { graphql } from "gatsby";
import PropTypes from "prop-types";
import * as React from "react";
import Layout from "../components/layout";
import RelatedPosts from "../components/related-posts";
import Seo from "../components/seo";

const Tags = ({
	pageContext,
	data: {
		site,
		allContentfulPost: { totalCount, nodes: posts },
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
	return <Seo title={`Tag ${pageContext.tag}`} />;
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
				}),
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
    allContentfulPost(
      limit: 2000
      sort: { slug: DESC  }
      filter: { tags: {tags: { in: [$tag] }} } 
    ) {
      totalCount
      nodes {
      title
      description {
        description
      }
      date
      slug
    }
    }
  }
`;
