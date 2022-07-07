import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";
import { HomeIcon } from "../ui-libraries/icon/HomeIcon";
import { UsersIcon } from "../ui-libraries/icon/UsersIcon";
import { CalendarIcon } from "../ui-libraries/icon/CalendarIcon";
import { TextIcon } from "../ui-libraries/icon/TextIcon";
import { AppButton } from "../ui-libraries/AppButton";
import { successToast } from "../ui-libraries/AppToast";

const MENU = [
  { icon: <HomeIcon />, label: "ホーム", href: "/" },
  { icon: <UsersIcon />, label: "1on1", href: "/1on1" },
  { icon: <CalendarIcon />, label: "カレンダー", href: "/calendar" },
  { icon: <TextIcon />, label: "教材", href: "/text" },
];

export const SideBar = () => {
  const router = useRouter();
  const auth = getAuth();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        successToast;
        router.push("/signup");
      })
      .catch((error) => {
        // エラーが発生しましたをslackに通知
        console.error(error);
      });
  };

  return (
    <div>
      <aside className="flex sticky top-10 flex-col justify-between  h-[calc(100vh-3rem)] border-r">
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
        <AppButton
          type="button"
          color="gray"
          size="xs"
          radius="md"
          variant="outline"
          compact
          onClick={handleLogout}
          className="mx-auto mb-5"
        >
          ログアウト
        </AppButton>
        <Toaster />
      </aside>
    </div>
  );
};
