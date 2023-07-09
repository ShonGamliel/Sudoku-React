import React from "react";

export default function Box({ position, setNumberInArray, style }) {
  return (
    <div className="box" style={style}>
      <input
        className="box-input"
        onChange={(e) => {
          if (e.target.value) {
            if (!(/^\d+$/.test(e.target.value) || /^-?\d*\.?\d+$/.test(e.target.value)) || parseInt(e.target.value) > 9 || parseInt(e.target.value) < 1) {
              e.target.value = e.target.value.slice(0, -1);
            } else {
              const check = setNumberInArray(position, e.target.value);
              if (!check) {
                e.target.value = "";
              }
            }
          }
        }}
      />
    </div>
  );
}
