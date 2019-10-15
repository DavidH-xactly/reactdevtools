import React, { useEffect, useState } from "react";
import axios from "axios";
import styled, { keyframes, css } from "styled-components";

import "./App.css";

const GK = "37WTZeURvphv5Bo50dN55r0TmcKM9mqK";

const Main = styled.div`
  background: orangered;
  display: flex;
  justify-content: space-around;
  align-content: center;
  flex-wrap: wrap;
`;
Main.displayName = "Main";

const selectAnimation = keyframes`
  from {
    transform: scale(1);
    border: 5px solid transparent;
  }

  to {
    transform: scale(1.1);
    border: 5px solid black;
  }
`;

const ImageWrapper = styled.div`
  height: 150px;
  width: 150px;
  overflow: hidden;
  margin: 25px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ selected }) => {
    return (
      selected &&
      css`
        animation: ${selectAnimation} 3s forwards;
      `
    );
  }}
`;
ImageWrapper.displayName = "ImageWrapper";

const App = props => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("cats");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=${GK}&q=${searchTerm}&limit=100`
      )
      .then(({ data: { data } }) => {
        console.log(data);
        setData(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [searchTerm]);

  return (
    <Main>
      {data ? (
        data.map((result, i) => (
          <ImageWrapper
            onClick={() => setSelectedIndex(i)}
            selected={i === selectedIndex}
          >
            <img src={result.images.fixed_height.url} alt={result.title} />
          </ImageWrapper>
        ))
      ) : (
        <div>HI</div>
      )}
    </Main>
  );
};

export default App;
