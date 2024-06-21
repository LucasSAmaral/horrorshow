/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import _ from "lodash";
import styled from "styled-components";

const getAuthor = (postAuthor, authorArray) => {
  return authorArray.find(author => author.name === postAuthor);
};

const getAuthorPath = postAuthor => {
  return `/author/${_.kebabCase(postAuthor)}`;
};

const Bio = ({ postAuthor }) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
            social {
              letterboxd
            }
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const authorArray = data.site.siteMetadata?.author;

  switch (postAuthor) {
    case "Lucas Amaral": {
      const author = getAuthor(postAuthor, authorArray);
      const authorPath = getAuthorPath(postAuthor);

      return (
        <BioWrapper className="bio">
          <StaticImage
            className="bio-avatar"
            layout="fixed"
            formats={["auto", "webp", "avif"]}
            src="../images/lucas-profile-pic.jpg"
            width={50}
            height={50}
            quality={95}
            alt="Imagem de perfil do Lucas na base da torre Eiffel"
          />
          <div>
            {author?.name && (
              <>
                <p className="written-by">
                  Escrito por{" "}
                  <Link className="author-link" to={authorPath}>
                    {author.name}
                  </Link>
                </p>
                {author?.summary.map(paragraph => (
                  <p>{paragraph}</p>
                ))}

                <Wrapper>
                  Redes Sociais:
                  <p>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={author?.social?.letterboxd || ``}
                    >
                      <StaticImage
                        layout="fixed"
                        formats={["auto", "webp", "avif"]}
                        src="../images/letterboxd-icon.svg"
                        width={30}
                        height={30}
                        quality={95}
                        alt="Profile picture"
                      />
                      Letterboxd
                    </a>
                  </p>
                </Wrapper>
              </>
            )}
          </div>
        </BioWrapper>
      );
    }

    case "Gilma G.": {
      const author = getAuthor(postAuthor, authorArray);
      const authorPath = getAuthorPath(postAuthor);

      return (
        <BioWrapper className="bio">
          <StaticImage
            className="bio-avatar"
            layout="fixed"
            formats={["auto", "webp", "avif"]}
            src="../images/gilma-profile-pic.jpeg"
            width={50}
            height={50}
            quality={95}
            alt="Foto de perfil em preto e branco da Gilma"
          />
          <div>
            {author?.name && (
              <>
                <p className="written-by">
                  Escrito por{" "}
                  <Link className="author-link" to={authorPath}>
                    {author.name}
                  </Link>
                </p>
                {author?.summary.map(paragraph => (
                  <p>{paragraph}</p>
                ))}
              </>
            )}
          </div>
        </BioWrapper>
      );
    }

    case "Jack": {
      const author = getAuthor(postAuthor, authorArray);
      const authorPath = getAuthorPath(postAuthor);

      return (
        <BioWrapper className="bio">
          <StaticImage
            className="bio-avatar"
            layout="fixed"
            formats={["auto", "webp", "avif"]}
            src="../images/profile-pic.png"
            width={50}
            height={50}
            quality={95}
            alt="Profile picture"
          />
          <div>
            {author?.name && (
              <>
                <p className="written-by">
                  Escrito por{" "}
                  <Link className="author-link" to={authorPath}>
                    {author.name}
                  </Link>
                </p>
                {/* <p>{author?.summary || null}</p> */}

                <p>
                  <a
                    href={`https://twitter.com/${
                      author?.social?.twitter || ``
                    }`}
                  >
                    You should follow them on Twitter
                  </a>
                </p>
              </>
            )}
          </div>
        </BioWrapper>
      );
    }

    default:
      return <></>;
  }
};

const BioWrapper = styled.div`
  .written-by {
    margin-bottom: 5px;
  }
  p {
    margin-bottom: 0;
  }
`;

const Wrapper = styled.div`
  margin-top: 15px;

  a {
    display: flex;
    gap: 5px;
  }
`;

export default Bio;
