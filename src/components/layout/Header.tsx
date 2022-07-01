import { memo, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserCircleIcon } from "../ui-libraries/icon/UserCircleIcon";
import { BellIcon } from "../ui-libraries/icon/BellIcon";

type HeaderProps = {
  navItem: ReactNode;
};

export const NavItem = memo(() => {
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

export const Header = memo(({ navItem }: HeaderProps) => {
  return (
    <header className="flex sticky top-0 z-10 justify-between items-center py-3 px-4 h-12 border-b">
      <Link href={"/"}>
        <Image src={"/favicons/favicon-32x32.png"} width={32} height={32} alt="Tech.Uniアイコン" />
      </Link>
      {navItem}
    </header>
  );
});
Header.displayName = "Header";

// todo : ボタンのコンポーネント化
// todo: userの画像を表示する
// todo: ログアウト処理
// mapで回して、アイコンにbellとuserCircleIconを挿入する
