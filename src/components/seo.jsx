/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ description, title, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              instagram
              twitter
              tiktok
              youtube
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={site.siteMetadata?.social?.twitter || ``}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="instagram:card" content="summary" />
      <meta
        name="instagram:creator"
        content={site.siteMetadata?.social?.instagram || ``}
      />
      <meta name="instagram:title" content={title} />
      <meta name="instagram:description" content={metaDescription} />
      <meta name="tiktok:card" content="summary" />
      <meta
        name="tiktok:creator"
        content={site.siteMetadata?.social?.tiktok || ``}
      />
      <meta name="tiktok:title" content={title} />
      <meta name="tiktok:description" content={metaDescription} />
      <meta name="youtube:card" content="summary" />
      <meta
        name="youtube:creator"
        content={site.siteMetadata?.social?.youtube || ``}
      />
      <meta name="youtube:title" content={title} />
      <meta name="youtube:description" content={metaDescription} />
      {children}
    </>
  );
};

export default Seo;
