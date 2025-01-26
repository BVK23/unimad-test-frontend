import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="h-full w-full">
      <h1 className="text-primary-blue text-lg font-semibold my-4">Interview Prep</h1>
      {children}
    </div>
  );
};

export default Layout;
