import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as React from "react";

const Poster = ({ posterUrl, posterImage, posterImageAlt }) => {
	if (posterUrl) {
		return <img src={posterUrl} loading="lazy" alt={posterImageAlt} />;
	}

	return (
		<GatsbyImage
			image={getImage(posterImage.gatsbyImageData)}
			alt={posterImageAlt}
		/>
	);
};

export default Poster;
