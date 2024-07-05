import React, { useState } from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import styled from "styled-components";
import { StyledLink } from "../components/styled-link";
import _ from "lodash";
import TagsComponent from "../components/tags-component";
import Script from "../components/script";

const Busca = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Horrorshow`;
  const social = data.site.siteMetadata?.social;
  const allPosts = data.allMarkdownRemark.nodes;

  const emptyQuery = "";

  const [state, setState] = useState({ filteredData: [], query: emptyQuery });

  const handleInputChange = event => {
    const query = event.target.value;
    const lowerCaseQuery = query.toLowerCase();
    const posts = data.allMarkdownRemark.nodes || [];

    const filteredData = posts.filter(post => {
      const { author, description, title, tags } = post.frontmatter;

      return (
        author.toLowerCase().includes(lowerCaseQuery) ||
        description?.toLowerCase().includes(lowerCaseQuery) ||
        title.toLowerCase().includes(lowerCaseQuery) ||
        (tags && tags.join("").toLowerCase().includes(lowerCaseQuery))
      );
    });

    setState({ query, filteredData });
  };

  const { filteredData, query } = state;

  const hasSearchResults = filteredData && query !== emptyQuery;

  const posts = hasSearchResults ? filteredData : allPosts;

  return (
    <Layout posts={posts} location={location} title={siteTitle} social={social}>
      <SearchWrapper>
        <SearchTitle>Busca</SearchTitle>

        <Input
          type="text"
          aria-label="Search"
          placeholder="Digite para filtrar os posts"
          onChange={handleInputChange}
        />
      </SearchWrapper>
      <Ol>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug;
          const author = post.frontmatter.author;
          const tags = post.frontmatter.tags;

          const kebabCaseAuthor = _.kebabCase(author);

          return (
            <li key={post.fields.slug}>
              <article
                className={`post-list-item no-poster`}
                itemScope
                itemType="http://schema.org/Article"
              >
                <div>
                  <header>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <p>
                      <small>
                        Texto por:{" "}
                        <Link
                          className="author-link"
                          to={`/author/${kebabCaseAuthor}`}
                        >
                          {author}
                        </Link>
                      </small>
                    </p>
                    <p>
                      <small>Postado em: {post.frontmatter.date}</small>
                    </p>
                  </header>

                  <TagsComponent tags={tags} />

                  <section>
                    <p itemProp="description">
                      {post.frontmatter.description || post.excerpt}{" "}
                    </p>
                    <p>
                      <StyledLink to={post.fields.slug} itemProp="url">
                        Leia +
                      </StyledLink>
                    </p>
                  </section>
                </div>
              </article>
            </li>
          );
        })}
      </Ol>
    </Layout>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 320px) {
    padding: 0 25px;
  }
`;

const SearchTitle = styled.h1`
  text-align: center;
  font-family: var(--title-font);
  color: var(--title-color);
  margin: 0;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
`;

const Ol = styled.ol`
  list-style: none;

  li {
    .with-poster {
      display: flex;
      gap: 15px;

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 0 25px;
      }

      .gatsby-image-wrapper {
        overflow: visible;

        @media (max-width: 768px) {
          width: 100%;

          img {
            height: auto;
          }
        }
      }
    }

    .no-poster {
      display: block;

      @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 0 25px;
      }
    }
  }
`;

export default Busca;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => (
  <>
    <Script />
    <Seo title="Busca" />
  </>
);

export const pageQuery = graphql`
  {
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
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD/MM/YYYY")
          author
          title
          description
          tags
        }
      }
      totalCount
    }
  }
`;
