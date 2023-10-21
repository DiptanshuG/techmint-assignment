import React, { useState } from "react";
import styled from "styled-components";

const PostContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:hover {
    transform: scale(1.02);
  }
`;

const PostTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin: 0;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &::before {
    content: "→";
    font-size: 1rem;
    margin-right: 5px;
  }
`;

const PostContent = styled.div`
  font-size: 1rem;
  color: #555;
`;

const PostPopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const PostPopupContent = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  padding: 20px;
  margin: 10px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;
const Label = styled.div`
  font-size: 1rem;
  color: grey;
  font-weight: bold;
`;

const Post = ({ title, content }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <PostContainer>
        <Label>Title:</Label>

        <PostTitle onClick={openPopup}>{title}</PostTitle>
        <Label>Content:</Label>

        <PostContent>{content}</PostContent>
      </PostContainer>

      {isPopupOpen && (
        <PostPopupOverlay onClick={closePopup}>
          <PostPopupContent>
            <h2>{title}</h2>
            <p>{content}</p>
          </PostPopupContent>
        </PostPopupOverlay>
      )}
    </div>
  );
};

export default Post;
