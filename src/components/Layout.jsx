import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto p-4 md:p-8">{children}</main>
    </div>
  );
};

export default Layout;
