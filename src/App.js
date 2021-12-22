import React, { useState } from "react";

function keyDownHandler(e, ID, setID, down, setDown) {
  if (down) {
    return;
  } else if (e.keyCode == 37) {
    setID(ID - 1);
    setDown(true);
  } else if (e.keyCode == 39) {
    setID(ID + 1);
    setDown(true);
  }
}

function keyUpHandler(e, down, setDown) {
  setDown(false);
}

function App() {
  const [ID, setID] = useState(7000);
  const [down, setDown] = useState(false);
  // document.addEventListener(
  //   "keydown",
  //   (e) => keyDownHandler(e, ID, setID, down, setDown),
  //   false
  // );

  // document.addEventListener(
  //   "keyup",
  //   (e) => keyUpHandler(e, down, setDown),
  //   false
  // );

  return (
    <div className="App">
      <iframe
        src={`https://tokens.mathcastles.xyz/terraforms/token-html/${ID}`}
        width="615"
        height="900"
      ></iframe>
      <button onClick={() => setID(ID + 1)}>+</button>
      <button onClick={() => setID(ID - 1)}>-</button>
      <h1>{ID}</h1>
    </div>
  );
}

export default App;
