import { graphql } from "gatsby";
import * as React from "react";

import styled from "styled-components";
import Layout from "../components/layout";
import Seo from "../components/seo";

const NotFoundPage = ({ data, location }) => {
	const siteTitle = data.site.siteMetadata.title;
	const social = data.site.siteMetadata?.social;
	const posts = data.allContentfulPost.nodes;

	return (
		<Layout posts={posts} location={location} title={siteTitle} social={social}>
			<Wrapper>
				<h1>Sobre Nós</h1>
				<p>
					Aqui falamos e divagamos sobre o que vimos recentemente relacionado ao
					gênero terror, mas não necessáriamente só terror.
				</p>
				<p>
					Falamos sobre terror e suspense de forma descontraída. Seja sobre
					filmes, séries, hqs e games. Até mesmo novelas. Por que não?
				</p>
			</Wrapper>
		</Layout>
	);
};

export const Head = () => <Seo title="Sobre Nós" />;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: justify;

  @media (max-width: 540px) {
    padding: 0 25px;
  }

  h1 {
    font-family: var(--title-font);
    color: var(--title-color);
    font-size: 55px;
    margin: 0 0 1rem 0;

    @media (max-width: 1180px) {
      font-size: 45px;
    }
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
    allContentfulPost(sort: { date: DESC } ) {
      nodes {
          slug
          title
      }
    }
  }
`;
