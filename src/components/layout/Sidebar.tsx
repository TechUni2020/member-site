import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { HomeIcon, UsersIcon, TextIcon, StudyMeetingIcon, MemberIcon } from "../ui-libraries/icon";
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
        router.push(LINKS.SIGNUP);
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
      </aside>
    </div>
  );
};
