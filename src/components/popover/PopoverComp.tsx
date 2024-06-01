import React, { useState } from "react";
import { Avatar } from "@mui/material";
import {
  BsBox,
  BsFillTabletFill,
  BsChat,
  BsChatLeftQuote,
  BsDoorClosed,
  BsDropbox,
  BsPerson,
} from "react-icons/bs";

const PopoverComp = () => {
  const [menuDisplay, setMenuDisplay] = useState<HTMLElement | null>(null);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    setMenuDisplay(e.currentTarget);
  };
  return (
    <>
      <Avatar sx={{ width: 24, height: 24 }} />

      <div className="absolute border rounded top-14 p-3 flex flex-col bg-zinc-50 gap-3">
        <li className="inline-flex items-center hover:bg-purple-300 hover:text-white p-2">
          <span>
            <BsBox />
          </span>
          <span className="text-xs ms-2">Tum Siparislerim</span>
        </li>
        <li className="inline-flex items-center hover:bg-purple-300 hover:text-white p-2">
          <span>
            <BsChat />
          </span>
          <span className="text-xs ms-2">Degerlendirmelerim</span>
        </li>
        <li className="inline-flex items-center hover:bg-purple-300 hover:text-white p-2">
          <span>
            <BsChatLeftQuote />
          </span>
          <span className="text-xs ms-2">Satici Mesajlarim</span>
        </li>
        <li className="inline-flex items-center hover:bg-purple-300 hover:text-white p-2">
          <span>
            <BsDropbox />
          </span>
          <span className="text-xs ms-2">Sansli Cekilis</span>
        </li>
        <li className="inline-flex items-center hover:bg-purple-300 hover:text-white p-2">
          <span>
            <BsFillTabletFill />
          </span>
          <span className="text-xs ms-2">Kuponlarim</span>
        </li>
        <li className="inline-flex items-center hover:bg-purple-300 hover:text-white p-2">
          <span>
            <BsPerson />
          </span>
          <span className="text-xs ms-2">Kullanici Bilgilerim</span>
        </li>
        <li className="inline-flex items-center hover:bg-purple-300 hover:text-white p-2">
          <span>
            <BsDoorClosed />
          </span>
          <span className="text-xs ms-2">Cikis Yap</span>
        </li>
      </div>
    </>
  );
};

export default PopoverComp;
