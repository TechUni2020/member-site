import { Button } from "@mantine/core";
import Link from "next/link";
import { auth } from "../utils/libs/firebase";
import { HomeIcon } from "../ui-libraries/icon/HomeIcon";
import { UsersIcon } from "../ui-libraries/icon/UsersIcon";
import { CalendarIcon } from "../ui-libraries/icon/CalendarIcon";
import { TextIcon } from "../ui-libraries/icon/TextIcon";

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
