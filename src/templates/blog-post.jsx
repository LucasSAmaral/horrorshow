import { Link, graphql } from "gatsby";
import * as React from "react";

import { Disqus } from "gatsby-plugin-disqus";
import _ from "lodash";
import styled from "styled-components";
import Bio from "../components/bio";
import Layout from "../components/layout";
import MovieRating from "../components/movie-rating";
import Seo from "../components/seo";
import { StyledLink } from "../components/styled-link";
import TagsComponent from "../components/tags-component";

const BlogPostTemplate = ({
	data: {
		previous,
		next,
		site,
		contentfulPost: post,
		allContentfulPost: { nodes: posts },
	},
	location,
}) => {
	const siteTitle = site.siteMetadata?.title || `Horrorshow`;
	const social = site.siteMetadata?.social;
	const author = post.author;

	const kebabCaseAuthor = _.kebabCase(author);

	return (
		<Layout posts={posts} location={location} title={siteTitle} social={social}>
			{/* <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1907274240349428"
        data-ad-slot="1509501448"
        data-ad-format="auto"
        data-full-width-responsive="true"
      /> */}
			<article
				className="blog-post"
				itemScope
				itemType="http://schema.org/Article"
			>
				<header>
					<h1 itemProp="headline">{post.title}</h1>
					<p>
						Texto por:{" "}
						<Link className="author-link" to={`/author/${kebabCaseAuthor}`}>
							{author}
						</Link>
					</p>
					<p>Postado em: {post.date}</p>
				</header>
				<TagsComponentWrapper>
					<TagsComponent className="tag-post" tags={post.tags.tags} />
				</TagsComponentWrapper>
				<Section
					dangerouslySetInnerHTML={{ __html: post.html.html }}
					itemProp="articleBody"
				/>
				{post.rating && <MovieRating rating={post.rating} />}

				<hr />
				<footer>
					<Bio postAuthor={post.author} />
				</footer>
			</article>
			<nav className="blog-post-nav">
				<Ul>
					<li>
						{previous && (
							<StyledLink to={`/${previous.slug}`} rel="prev">
								← {previous.title}
							</StyledLink>
						)}
					</li>
					<li>
						{next && (
							<StyledLink to={`/${next.slug}`} rel="next">
								{next.title} →
							</StyledLink>
						)}
					</li>
				</Ul>
			</nav>
			{/* <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1907274240349428"
        data-ad-slot="8955218708"
        data-ad-format="auto"
        data-full-width-responsive="true"
      /> */}
			<DisqusWrapper>
				<Disqus
					config={{
						url: `http://horrorshow.com.br${location.pathname}`,
						identifier: post.id,
						title: post.title,
					}}
				/>
			</DisqusWrapper>
		</Layout>
	);
};

export const Head = ({ data: { contentfulPost: post } }) => {
	return <Seo title={post.title} description={post.description} />;
};

const TagsComponentWrapper = styled.div`
  margin-bottom: 32px;
`;

const Section = styled.section`
  text-align: justify;

  figure {
	img {
		width: 100%;
	}
  }

  .gatsby-resp-iframe-wrapper {
	padding-bottom: 50%;
    position: relative;
    height: 0;
    overflow: hidden;
    margin-bottom: 1.0725rem;
	
	iframe {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`;

const DisqusWrapper = styled.div`
  @media (max-width: 430px) {
    padding: 0 35px;
  }
`;

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
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
    allContentfulPost(sort: {date: DESC}) {
    nodes {
      slug
      title
    }
  }
    contentfulPost (id: {eq: $id}) {
    id
    html {
      html
    }
    title
    author
    date(formatString: "DD/MM/YYYY")
    description {
      description
    }
    rating
    tags {
      tags
    }
  }
    previous: contentfulPost(id: {eq: $previousPostId }) {
      slug
      title
    }
    next: contentfulPost(id: {eq: $nextPostId }) {
      slug
      title
    }
  }
`;
