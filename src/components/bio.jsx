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
              twitter
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
        <div className="bio">
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
                <p>
                  Escrito por{" "}
                  <Link className="author-link" to={authorPath}>
                    {author.name}
                  </Link>
                </p>
                {author?.summary.map(paragraph => (
                  <p>{paragraph}</p>
                ))}

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
        </div>
      );
    }

    case "Boby": {
      const author = getAuthor(postAuthor, authorArray);
      const authorPath = getAuthorPath(postAuthor);

      return (
        <div className="bio">
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
                <p>
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
        </div>
      );
    }

    case "Jack": {
      const author = getAuthor(postAuthor, authorArray);
      const authorPath = getAuthorPath(postAuthor);

      return (
        <div className="bio">
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
                <p>
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
        </div>
      );
    }

    default:
      return <></>;
  }
};

export default Bio;
