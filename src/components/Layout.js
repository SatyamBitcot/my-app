import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>

      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="layout" style={{ flex: 1 }}>
          <Header  />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
