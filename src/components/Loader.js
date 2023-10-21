import React from "react";
import styled from "styled-components";

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const CustomLoader = () => (
  <LoaderContainer>
    <Loader />
  </LoaderContainer>
);

export default CustomLoader;
