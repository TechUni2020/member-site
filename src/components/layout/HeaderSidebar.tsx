import { memo, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { HomeIcon } from "../ui-libraries/icon/HomeIcon";
import { auth } from "../utils/libs/firebase";
import { UsersIcon } from "../ui-libraries/icon/UsersIcon";
import { UserCircleIcon } from "../ui-libraries/icon/UserCircleIcon";
import { CalendarIcon } from "../ui-libraries/icon/CalendarIcon";
import { BellIcon } from "../ui-libraries/icon/BellIcon";
import { TextIcon } from "../ui-libraries/icon/TextIcon";
import { Button } from "@mantine/core";

type HeaderProps = {
  rightItem: ReactNode;
};

const MENU = [
  { icon: <HomeIcon />, label: "ホーム", href: "/" },
  { icon: <UsersIcon />, label: "1on1", href: "/1on1" },
  { icon: <CalendarIcon />, label: "カレンダー", href: "/calendar" },
  { icon: <TextIcon />, label: "教材", href: "/text" },
];

export const SideBar = () => {
  const logout = auth.signOut();
  const handleLogout = () => {
    logout;
  };
  return (
    <div>
      <aside className="flex sticky top-10 flex-col  h-[calc(100vh-3rem)] border-r">
        <ul>
          {MENU.map((menu) => {
            return (
              <Link href={menu.href} key={menu.label}>
                <a className="flex items-center py-3 pr-8  pl-3 hover:bg-gray-200">
                  {menu.icon}
                  <span className="pr-8 pl-3 font-bold">{menu.label}</span>
                </a>
              </Link>
            );
          })}
        </ul>
        <button onClick={handleLogout} className="p-1 m-3 text-sm bg-blue-200 hover:bg-blue-300 rounded-md">
          ログアウト
        </button>
        <Button>ログアウト</Button>
      </aside>
    </div>
  );
};

export const RightItem = memo(() => {
  return (
    <div className="flex gap-5 items-center">
      <BellIcon />
      <Link href={"/setting"}>
        <a className="p-2 hover:bg-gray-200 rounded-full">
          <UserCircleIcon />
        </a>
      </Link>
    </div>
  );
});
RightItem.displayName = "RightItem";

export const Header = memo(({ rightItem }: HeaderProps) => {
  return (
    <header className="flex sticky top-0 z-10 justify-between items-center py-3 px-4 h-12 border-b">
      <Link href={"/"}>
        <Image src={"/favicons/favicon-32x32.png"} width={32} height={32} alt="Tech.Uniアイコン" />
      </Link>
      {rightItem}
    </header>
  );
});
Header.displayName = "Header";

// todo : ボタンのコンポーネント化
// todo: userの画像を表示する
// todo: ログアウト処理
