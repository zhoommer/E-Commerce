import React from "react";
import { Links } from "./navbar-links";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarLinks = () => {
  const pathname = usePathname();

  return (
    <div
      className="container text-center text-sm mt-3 p-3 border"
      style={{
        display:
          pathname === "/" || pathname?.split("/")[1] === "boutique"
            ? "block"
            : "none",
      }}
    >
      {Links.map((link, index) => (
        <Link
          href={link.href}
          key={index}
          className={
            link.href === pathname ? "ms-4 text-purple-900 active-link" : "ms-4"
          }
        >
          {link.name}
          <span className="ms-1">{link.property}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavbarLinks;
