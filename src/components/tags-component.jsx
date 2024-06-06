import * as React from "react";
import styled from "styled-components";
import { navigate } from "gatsby";

const TagsComponent = ({ tags, className }) => {
  return (
    <TagsWrapper className={className}>
      {tags?.map(tag => {
        return (
          <Tag
            key={tag}
            variant="outlined"
            onClick={() => {
              navigate(`/tag/${tag}`);
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
  align-items: center;
  margin-bottom: var(--spacing-2);
  font-size: 19px;
`;

const Tag = styled.div`
  margin-right: 2.5%;
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
