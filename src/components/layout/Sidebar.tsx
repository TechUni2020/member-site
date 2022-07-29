import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { HomeIcon, UsersIcon, TextIcon, StudyMeetingIcon, MemberIcon, LogoutIcon } from "../ui-libraries/icon";
import { AppButton } from "../ui-libraries/AppButton";
import { successToast } from "../ui-libraries/AppToast";
import { auth } from "../utils/libs/firebase";
import { LINKS } from "../utils/constants/link";

const MENU = [
  { icon: <HomeIcon />, label: "ホーム", href: LINKS.HOME },
  { icon: <MemberIcon />, label: "メンバー", href: LINKS.MEMBER },
  { icon: <TextIcon />, label: "教材", href: LINKS.TEXT },
  { icon: <StudyMeetingIcon />, label: "勉強会", href: LINKS.STUDYMEETING },
  { icon: <UsersIcon />, label: "1on1", href: LINKS.ONEONONE },
];

export const SideBar = () => {
  const router = useRouter();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        successToast();
        router.push(LINKS.LOGIN);
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
              <li key={menu.label}>
                <Link href={menu.href}>
                  <a className="flex justify-center items-center py-3 hover:bg-gray-100 md:justify-start md:pl-2 transition ease-in delay-50 hover:translate-x-1">
                    {menu.icon}
                    <span className="hidden md:inline-block md:pr-8 md:pl-2 md:font-bold">{menu.label}</span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
        <AppButton
          type="button"
          color="gray"
          size="xs"
          radius="md"
          variant="subtle"
          compact
          onClick={handleLogout}
          className="mx-auto mb-5"
        >
          <LogoutIcon />
        </AppButton>
      </aside>
    </div>
  );
};
