import "./App.css";
import React from "react";
import Box from "./Box";

let blocks = [
  [0, 1, 2, 9, 10, 11, 18, 19, 20],
  [3, 4, 5, 12, 13, 14, 21, 22, 23],
  [6, 7, 8, 15, 16, 17, 24, 25, 26],
  [27, 28, 29, 36, 37, 38, 45, 46, 47],
  [30, 31, 32, 39, 40, 41, 48, 49, 50],
  [33, 34, 35, 42, 43, 44, 51, 52, 53],
  [54, 55, 56, 63, 64, 65, 72, 73, 74],
  [57, 58, 59, 66, 67, 68, 75, 76, 77],
  [60, 61, 62, 69, 70, 71, 78, 79, 80],
];

function App() {
  const [array, setArray] = React.useState(Array(81).fill(""));
  const setNumberInArray = (position, newNumber) => {
    const lineRange = Array.from({ length: 9 }, (_, index) => index + Math.floor(position / 9) * 9);
    for (let ii of lineRange) {
      if (array[ii] == newNumber) {
        return false;
      }
    }
    const columnRange = Array.from(Array(81).keys()).filter((num) => num % 9 === position % 9);
    for (let ii of columnRange) {
      if (array[ii] == newNumber) {
        return false;
      }
    }

    for (let i of blocks) {
      if (i.includes(position)) {
        for (let ii of i) {
          if (array[ii] == newNumber) {
            return false;
          }
        }
      }
    }

    setArray((prevState) => {
      let newarray = [...prevState];
      newarray[position] = newNumber;
      return newarray;
    });
    return true;
  };

  return (
    <div className="App">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i1, idx1) => (
        <div className="line" key={idx1}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i2, idx2) => {
            const position = idx1 * 9 + idx2;
            const columnGap = position % 3;
            const lineGap = (idx1 + 1) % 3;
            return <Box key={position} position={position} setNumberInArray={setNumberInArray} style={{ borderBottomWidth: lineGap ? 0 : 3.5, borderLeftWidth: columnGap ? 0 : 3.5 }} />;
          })}
        </div>
      ))}
    </div>
  );
}

export default App;
