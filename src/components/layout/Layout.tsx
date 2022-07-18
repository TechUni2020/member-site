import { Header } from "./Header";
import { SideBar } from "./Sidebar";
import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = (props) => {
  const { children } = props;

  return (
    <div className="">
      <Header />
      <div className="flex">
        <SideBar />
        <div className="flex flex-col grow">
          <main className="flex-1 pl-4 bg-gray-50">{children}</main>
        </div>
      </div>
    </div>
  );
};
