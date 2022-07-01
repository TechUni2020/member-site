import { FC, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserCircleIcon } from "../ui-libraries/icon/UserCircleIcon";
import { BellIcon } from "../ui-libraries/icon/BellIcon";

export const NavItem: FC = memo(() => {
  return (
    <div className="flex gap-5 items-center">
      <BellIcon />
      <a className="p-2 hover:bg-gray-200 rounded-full">
        <UserCircleIcon />
      </a>
    </div>
  );
});
NavItem.displayName = "NavItem";

export const Header: FC = memo(() => {
  return (
    <header className="flex sticky top-0 z-10 justify-between items-center py-3 px-4 h-12 border-b">
      <Link href={"/"}>
        <Image src={"/favicons/favicon-32x32.png"} width={32} height={32} alt="Tech.Uniアイコン" />
      </Link>
      <NavItem />
    </header>
  );
});
Header.displayName = "Header";

// todo : ボタンのコンポーネント化
// todo: userの画像を表示する
// todo: ログアウト処理
// mapで回して、アイコンにbellとuserCircleIconを挿入する
// 通知・ユーザーアイコンをクリックした時に、モーダル表示する
