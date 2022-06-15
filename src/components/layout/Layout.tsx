// import Menubar from "./MenuBar";
import { Header } from "./Header";
import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = (props) => {
  const { children } = props;

  return (
    <div>
      <div className="pt-4 pb-1 mx-auto">
        <Header />
      </div>
      <div className="flex w-screen min-h-screen">
        <aside className="sticky top-0 w-60 h-screen bg-white">
          <nav className="mt-10">{/* <Menubar /> */}</nav>
        </aside>
        <div className="flex flex-col">
          <main className="w-full">{children}</main>
          <footer className="bg-gray-100">
            <div className="p-8">
              <div className="text-center text-gray-600">
                <p>Tech.Uni org.</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
