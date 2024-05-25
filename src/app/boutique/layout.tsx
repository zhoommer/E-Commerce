import React from "react";
import { boxes, boxes2, boxes3 } from "@/boxes-data/boxes-data";
import Box from "@/components/box/box";

export default function BoutiqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <div className="mt-9 flex gap-44">
        {boxes.map((item, index) => (
          <Box key={index} box={item} />
        ))}
      </div>
      <div className="mt-9 flex gap-44">
        {boxes2.map((item, index) => (
          <Box key={index} box={item} />
        ))}
      </div>
      <div className="mt-9 grid grid-cols-3 " style={{ columnGap: "7em" }}>
        {boxes3.map((item, index) => (
          <Box key={index} box={item} />
        ))}
      </div>{" "}
    </div>
  );
}
