"use client";

import useLenis from "@/app/hooks/useLenis";

const Content = ({ children }) => {
  useLenis();

  return <div className="content-wrapper">{children}</div>;
};
export default Content;
