import "./App.css";
import React from "react";
import Box from "./Box";

function App() {
  const [array, setArray] = React.useState(Array(81).fill(""));
  const [startPositions, setStartPositions] = React.useState([]);

  const setNumberInArray = (position, newNumber) => {
    if (!newNumber) {
      return setArray((prevState) => {
        let newarray = [...prevState];
        newarray[position] = "";
        return newarray;
      });
    }
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

    let r = position - (Math.floor(position / 9) % 3) * 9 - (position % 3);
    let blockRange = Array.from({ length: 81 }, (_, i) => ([r, r + 1, r + 2, r + 9, r + 10, r + 11, r + 18, r + 19, r + 20].includes(i) ? i : false)).filter(Boolean);
    for (let ii of blockRange) {
      if (array[ii] == newNumber) {
        return false;
      }
    }

    setArray((prevState) => {
      let newarray = [...prevState];
      newarray[position] = newNumber;
      return newarray;
    });
    return true;
  };

  function generateArrayOfArrays(numArrays) {
    var resultArray = [];

    for (var i = 0; i < numArrays; i++) {
      var num1 = Math.floor(Math.random() * 81);
      var num2 = Math.floor(Math.random() * 9) + 1;
      resultArray.push([num1, num2]);
    }

    return resultArray;
  }

  React.useEffect(() => {
    let start = generateArrayOfArrays(10);
    for (let i of start) {
      setNumberInArray(i[0], i[1]);
      setStartPositions((startPositions) => [...startPositions, i[0]]);
    }
  }, []);

  return (
    <div className="App">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i1, idx1) => (
        <div className="line" key={idx1}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i2, idx2) => {
            const position = idx1 * 9 + idx2;
            const columnGap = position % 3;
            const lineGap = (idx1 + 1) % 3;
            return <Box key={position} position={position} setNumberInArray={setNumberInArray} style={{ borderBottomWidth: lineGap ? 0 : 3.5, borderLeftWidth: columnGap ? 0 : 3.5 }} array={array} isStart={startPositions.includes(position)} />;
          })}
        </div>
      ))}
    </div>
  );
}

export default App;
