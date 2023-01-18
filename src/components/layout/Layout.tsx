import React from "react";
import { MainLayout } from "./Layout.styled";

export interface IChildren {
  children: React.ReactNode;
}

const Layout = ({ children }: IChildren) => {
  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
