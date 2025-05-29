import { graphql } from "gatsby";
import PropTypes from "prop-types";
import * as React from "react";
import Layout from "../components/layout";
import RelatedPosts from "../components/related-posts";
import Seo from "../components/seo";

const Authors = ({
	pageContext,
	data: {
		site,
		allContentfulPost: { totalCount, nodes: posts },
	},
	location,
}) => {
	const { author } = pageContext;

	const siteTitle = site.siteMetadata?.title || `Horrorshow`;
	const social = site.siteMetadata?.social;

	const authorTitle = `${totalCount} ${
		totalCount === 1 ? "postagem" : "postagens"
	} escrita${totalCount === 1 ? "" : "s"} por "${author}"`;

	return (
		<Layout posts={posts} location={location} title={siteTitle} social={social}>
			<RelatedPosts title={authorTitle} posts={posts} />
		</Layout>
	);
};

export const Head = ({ pageContext }) => {
	return <Seo title={`Autor ${pageContext.author}`} />;
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
				}),
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
    sort: { slug: DESC }
    filter: { author: { in: [$author] } }
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
