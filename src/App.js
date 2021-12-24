import React, { useState } from "react";
import { FixedSizeGrid as Grid } from 'react-window';

import tokens from './tokens.json';
import useWindowDimensions from './useWindowDimensions'

const gridRef = React.createRef();

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

const Cell = ({ data, columnIndex, rowIndex, style}) => {
  const x = columnIndex;
  const y = rowIndex;
  const level = data.level;

  const key = `${level},${x},${y}`;
  const ID = tokens[key];
  if (ID == undefined) {
    return (
      <div style={style}>

      </div>
    )
  } else {
    return (
      <div style={style}>
        <iframe
          src={`https://tokens.mathcastles.xyz/terraforms/token-html/${ID}`}
          width="388"
          height="560"
          frameBorder="0"
          style={{padding: "0px"}}
          sandbox=""
        ></iframe>
        <a
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "inline-block",
            width:388,
            height: 560,
            zIndex: 5,
          }}
          target="_blank"
          href={`https://opensea.io/assets/0x4e1f41613c9084fdb9e34e11fae9412427480e56/${ID}`}></a>
      </div>
    );
  }
}

function coordToScroll(coord, coordSize, viewSize) {
  // What scroll do we need to get middle of coordinate in center of browser?
  const coordMiddle = coord + 0.5;
  const scrollMiddle = coordMiddle * coordSize;
  return scrollMiddle - viewSize / 2;
}

function scrollToCoord(scroll, coordSize, viewSize) {
  const scrollMiddle = scroll + viewSize / 2;
  const coordMiddle = scrollMiddle / coordSize;
  return Math.floor(coordMiddle);
}

function App() {
  const [level, setLevel] = useState(Math.floor(Math.random() * 20) + 1);
  const size = levelDimensions[level];
  
  const [x, setX] = useState(Math.floor(Math.random() * size));
  const [y, setY] = useState(Math.floor(Math.random() * size));

  const [userLevel, setUserLevel] = useState(level);
  const {height, width} = useWindowDimensions();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLevel(userLevel);
    gridRef.current.scrollToItem({
      columnIndex: x,
      rowIndex: y,
      align: "center",
    });
  }

  const onScroll = ({scrollLeft, scrollTop}) => {
    setX(scrollToCoord(scrollLeft, 388, width));
    setY(scrollToCoord(scrollTop, 560, height));
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit} style={{height: 22}}>
        <label>Level: </label>
        <input name="level" type="number" min="1" max="20" value={userLevel} onChange={(event) => setUserLevel(event.target.value)}/>
        <label>X: </label>
        <input name="x" type="number" min="0" max={size-1} value={x} onChange={(event) => setX(event.target.value)}/>
        <label>Y: </label>
        <input name="y" type="number" min="0" max={size-1} value={y} onChange={(event) => setY(event.target.value)}/>
        <input type="submit" value="Go" />
      </form>
      <Grid
        columnCount={size}
        columnWidth={388}
        height={height - 22}
        rowCount={size}
        rowHeight={560}
        width={width}
        itemData={{level: level}}
        ref={gridRef}
        onScroll={onScroll}
        initialScrollLeft={coordToScroll(x, 388, width)}
        initialScrollTop={coordToScroll(y, 560, height)}
        className="disable-scrollbars"
      >
        {Cell}
      </Grid>
    </div>
  );
}

export default App;
