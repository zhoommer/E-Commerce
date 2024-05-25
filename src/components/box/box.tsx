import React from "react";

interface BoxPropTypes {
  box: any;
}

const Box: React.FC<BoxPropTypes> = ({ box }) => {
  return (
    <div className="p-3 cursor-pointer" style={{ maxWidth: "400px" }}>
      <img
        src={box.img}
        alt={box.name}
        className="rounded hover:scale-105 transition ease-in"
      />
    </div>
  );
};

export default Box;
