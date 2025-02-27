import { Link } from "gatsby";
import * as React from "react";
import styled from "styled-components";
import { StyledLink } from "./styled-link";

const RelatedPosts = ({ title, posts }) => {
	return (
		<Wrapper>
			<h1>{title}</h1>

			<ul>
				{posts.map((post) => {
					const {
						slug,
						title,
						description: { description },
					} = post;

					return (
						<article key={slug}>
							<header>
								<h3>
									<Link to={`/${slug}`}>{title}</Link>
								</h3>
							</header>
							<section>
								<p>{description}</p>
								<StyledLink to={`/${slug}`}>Leia +</StyledLink>
							</section>
						</article>
					);
				})}
			</ul>
		</Wrapper>
	);
};

const Wrapper = styled.div`
  h1 {
    margin-top: 0;
  }

  h1,
  h3 {
    font-family: var(--title-font);
    color: var(--title-color);
  }

  h3 {
    font-size: 35px;
  }

  p {
    margin: 0;
  }

  @media (max-width: 680px) {
    padding: 0 25px;
  }
`;

export default RelatedPosts;
