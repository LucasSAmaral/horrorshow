import * as React from "react";
import { StyledLink } from "./styled-link";
import { Link } from "gatsby";
import styled from "styled-components";

const RelatedPosts = ({ title, posts }) => {
  return (
    <Wrapper>
      <h1>{title}</h1>

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
`;

export default RelatedPosts;
