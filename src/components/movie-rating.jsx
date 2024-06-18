import React from "react";
import styled from "styled-components";

import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  StarHalf as StarHalfIcon,
} from "@mui/icons-material";

const ZeroStarIcons = Array(5).fill(<StarBorderIcon />);
const FiveStarsIcons = Array(5).fill(<StarIcon />);
const OneStarIcons = [...FiveStarsIcons].fill(<StarBorderIcon />, 1);
const TwoStarsIcons = [...FiveStarsIcons].fill(<StarBorderIcon />, 2);
const ThreeStarsIcons = [...FiveStarsIcons].fill(<StarBorderIcon />, 3);
const FourStarsIcons = [...FiveStarsIcons].fill(<StarBorderIcon />, 4);

const isHalf = half => {
  return half === "5";
};

const MovieRating = ({ rating }) => {
  const [integer, half] = rating.split(".");

  const hasHalfStar = isHalf(half);

  switch (integer) {
    case "0": {
      if (hasHalfStar) {
        return (
          <RatingWrapper>
            <StarHalfIcon />
            <StarBorderIcon />
            <StarBorderIcon />
            <StarBorderIcon />
            <StarBorderIcon />
          </RatingWrapper>
        );
      }
      return <RatingWrapper>{ZeroStarIcons}</RatingWrapper>;
    }

    case "1": {
      if (hasHalfStar) {
        return (
          <RatingWrapper>
            <StarIcon />
            <StarHalfIcon />
            <StarBorderIcon />
            <StarBorderIcon />
            <StarBorderIcon />
          </RatingWrapper>
        );
      }
      return <RatingWrapper>{OneStarIcons}</RatingWrapper>;
    }

    case "2": {
      if (hasHalfStar) {
        return (
          <RatingWrapper>
            <StarIcon />
            <StarIcon />
            <StarHalfIcon />
            <StarBorderIcon />
            <StarBorderIcon />
          </RatingWrapper>
        );
      }
      return <RatingWrapper>{TwoStarsIcons}</RatingWrapper>;
    }
    case "3": {
      if (hasHalfStar) {
        return (
          <RatingWrapper>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarHalfIcon />
            <StarBorderIcon />
          </RatingWrapper>
        );
      }
      return <RatingWrapper>{ThreeStarsIcons}</RatingWrapper>;
    }
    case "4": {
      if (hasHalfStar) {
        return (
          <RatingWrapper>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarHalfIcon />
          </RatingWrapper>
        );
      }
      return (
        <RatingWrapper>
          Nota: <div>{FourStarsIcons}</div>
        </RatingWrapper>
      );
    }
    case "5":
    default:
      return <RatingWrapper>{FiveStarsIcons}</RatingWrapper>;
  }
};

const RatingWrapper = styled.div`
  text-align: center;
  margin-bottom: 15px;

  svg {
    fill: var(--title-color);
  }
`;

export default MovieRating;
