import * as React from "react"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

const Poster = ({ posterUrl, posterImage, posterImageAlt }) => {
  if (posterUrl) {
    return <img src={posterUrl} loading="lazy" alt={posterImageAlt} />
  }

  return <GatsbyImage image={getImage(posterImage)} alt={posterImageAlt} />
}

export default Poster
