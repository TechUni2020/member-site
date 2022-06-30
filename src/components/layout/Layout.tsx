// import Menubar from "./MenuBar";
import { Header, RightItem, SideBar } from "./HeaderSidebar";
import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = (props) => {
  const { children } = props;

  return (
    <div className="">
      <Header rightItem={<RightItem />} />
      <div className="flex">
        <SideBar />
        <div className="flex flex-col grow">
          <main className="flex-1 pl-4 bg-gray-50">{children}</main>
        </div>
      </div>
    </div>
  );
};
