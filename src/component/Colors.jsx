import React from "react";
import { colors } from "../utils";

const Colors = ({ note, setNote }) => {
  function colorClickHandler(c) {
    setNote((v) => ({ ...v, color: c }));
  }
  return (
    <div className="flex">
      {colors.map((c, index) =>
        index === 0 ? (
          <div
            key={c}
            onClick={()=>colorClickHandler(c)}
            className={`${c} color-box border`}
          ></div>
        ) : (
          <div
            key={c}
            onClick={() =>colorClickHandler(c)}
            className={`${c} color-box`}
          ></div>
        )
      )}
    </div>
  );
};

export default Colors;
