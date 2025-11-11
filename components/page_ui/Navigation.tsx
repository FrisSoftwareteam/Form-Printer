"use client";
import React from "react";

const route = [
  {
    href: "/about",
    label: "Offer",
  },
  {
    href: "/documents",
    label: "Documents",
  },
  {
    href: "/setting",
    label: "Settings",
  },
];

const Navigation = () => {
  return (
    <>
      <div className="flex justify-between">
        {" "}
        {/* {route.map((item) => (
          <>{item.label}</>
        ))}{" "} */}
      </div>
    </>
  );
};

export default Navigation;
