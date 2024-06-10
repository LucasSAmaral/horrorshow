import * as React from "react";
import styled from "styled-components";
import { navigate } from "gatsby";
import _ from "lodash";

const TagsComponent = ({ tags, className }) => {
  return (
    <TagsWrapper className={className}>
      {tags?.map(tag => {
        const kebabCaseTag = _.kebabCase(tag);

        return (
          <Tag
            key={tag}
            variant="outlined"
            onClick={() => {
              navigate(`/tag/${kebabCaseTag}`);
            }}
          >
            <p>{tag}</p>
          </Tag>
        );
      })}
    </TagsWrapper>
  );
};

const TagsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: var(--spacing-2);
  font-size: 19px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Tag = styled.div`
  cursor: pointer;
  white-space: nowrap;
  padding: 0px 10px;
  border-radius: 5px;
  color: #fafafa;
  font-family: var(--title-font);
  font-weight: bold;
  background-color: var(--title-color);
  height: 30.88px;
`;

export default TagsComponent;
