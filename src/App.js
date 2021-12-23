import React, { useState } from "react";

import tokens from './tokens.json';
import preview from './preview.svg';

const levelDimensions = [
  0,
  4,
  8,
  8,
  16,
  16,
  24,
  24,
  24,
  16,
  32,
  32,
  16,
  48,
  48,
  24,
  24,
  16,
  8,
  8,
  4
];

function App() {
  const [z, setZ] = useState(Math.floor(Math.random() * 20) + 1);

  const upperBound = levelDimensions[z];
  const [x, setX] = useState(Math.floor(Math.random() * upperBound));
  const [y, setY] = useState(Math.floor(Math.random() * upperBound));

  const key = `${z},${x},${y}`;
  const ID = tokens[key];

  var frame = null;
  if (ID == undefined) {
    frame = <img width="776" height="1120" padding="0px" src={preview}></img>
  } else {
    frame = <iframe
      src={`https://tokens.mathcastles.xyz/terraforms/token-html/${ID}`}
      width="776"
      height="1120"
      frameBorder="0"
    ></iframe>
  }

  function changeZ(newZ) {
    setZ(newZ);
    const newUpperBound = levelDimensions[newZ];
    setX(Math.min(x, newUpperBound - 1))
    setY(Math.min(y, newUpperBound - 1))
  }

  return (
    <div className="App">
      {frame}
      <button disabled={x == 0} onClick={() => setX(x - 1)}>←</button>
      <button disabled={x == upperBound - 1} onClick={() => setX(x + 1)}>	→</button>
      <button disabled={y == upperBound - 1} onClick={() => setY(y + 1)}>↓</button>
      <button disabled={y == 0} onClick={() => setY(y - 1)}>↑</button>
      <button disabled={z == 1} onClick={() => changeZ(z - 1)}>Down a Level</button>
      <button disabled={z == 20} onClick={() => changeZ(z + 1)}>Up a Level</button>
      <h1>ID: {ID}</h1>
      <h1>Level: {z}</h1>
      <h1>X Coordinate: {x}</h1>
      <h1>Y Coordinate: {y}</h1>
      <h1><a href={`https://opensea.io/assets/0x4e1f41613c9084fdb9e34e11fae9412427480e56/${ID}`}>OpenSea</a></h1>
    </div>
  );
}

export default App;
