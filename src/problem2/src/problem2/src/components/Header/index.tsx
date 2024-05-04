import React from "react";

export default function Header() {
  return (
    <div className="h-[90px] fixed top-0 left-0 w-full bg-white shadow-sm">
      <div className="container mx-auto flex items-center h-full">
        <h2 className="text-2xl font-bold bg-gradient-to-tl from-[#ffd342] to-[#ED2409] bg-clip-text text-transparent">
          Fancy Form
        </h2>
      </div>
    </div>
  );
}
