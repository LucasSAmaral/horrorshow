import { graphql } from "gatsby";
import * as React from "react";

import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";
import Layout from "../components/layout";
import Seo from "../components/seo";

const NotFoundPage = ({ data, location }) => {
	const siteTitle = data.site.siteMetadata.title;
	const social = data.site.siteMetadata?.social;
	const posts = data.allContentfulPost.nodes;

	console.log("posts", posts);

	return (
		<Layout posts={posts} location={location} title={siteTitle} social={social}>
			<Wrapper>
				<h1>404: Nada pra ver aqui</h1>
				<StaticImage
					layout="constrained"
					formats={["auto", "webp", "avif"]}
					src="../images/blood-hand.png"
					width={400}
					quality={95}
					alt="Mancha de sangue em forma de mão"
				/>
			</Wrapper>
		</Layout>
	);
};

export const Head = () => <Seo title="404" />;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1180px) {
    text-align: center;
  }

  h1 {
    font-family: var(--title-font);
    color: var(--title-color);
    font-size: 55px;
    margin: 0 0 35px 0;

    @media (max-width: 1180px) {
      font-size: 45px;
    }
  }

  img {
    width: 100%;
    max-width: 400px;
  }
`;

export default NotFoundPage;

export const pageQuery = graphql`
  query {
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
    allContentfulPost(sort: {  date: DESC } ) {
      nodes {
        slug
        title
      }
    }
  }
`;
