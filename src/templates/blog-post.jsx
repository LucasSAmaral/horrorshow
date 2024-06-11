import * as React from "react";
import { graphql, Link } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import styled from "styled-components";
import { StyledLink } from "../components/styled-link";
import { Disqus } from "gatsby-plugin-disqus";
import TagsComponent from "../components/tags-component";
import _ from "lodash";

const BlogPostTemplate = ({
  data: {
    previous,
    next,
    site,
    markdownRemark: post,
    allMarkdownRemark: { nodes: posts },
  },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Horrorshow`;
  const author = post.frontmatter.author;

  const kebabCaseAuthor = _.kebabCase(author);

  return (
    <Layout posts={posts} location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>
            Texto por:{" "}
            <Link className="author-link" to={`/author/${kebabCaseAuthor}`}>
              {author}
            </Link>
          </p>
          <p>Postado em: {post.frontmatter.date}</p>
        </header>
        <TagsComponentWrapper>
          <TagsComponent tags={post.frontmatter.tags} />
        </TagsComponentWrapper>
        <Section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio postAuthor={post.frontmatter.author} />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <Ul>
          <li>
            {previous && (
              <StyledLink to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </StyledLink>
            )}
          </li>
          <li>
            {next && (
              <StyledLink to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </StyledLink>
            )}
          </li>
        </Ul>
      </nav>
      {/* Trocar a baseUrl ao colocar em produção */}
      <DisqusWrapper>
        <Disqus
          config={{
            url: `http://localhost:8000${location.pathname}`,
            identifier: post.id,
            title: post.frontmatter.title,
          }}
        />
      </DisqusWrapper>
    </Layout>
  );
};

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  );
};

const TagsComponentWrapper = styled.div`
  margin-bottom: 32px;
`;

const Section = styled.section`
  text-align: justify;
`;

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`;

const DisqusWrapper = styled.div`
  @media (max-width: 425px) {
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
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        author
        date(formatString: "DD/MM/YYYY")
        description
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
