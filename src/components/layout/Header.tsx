/* eslint-disable @next/next/no-img-element */
import { FC, memo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar } from "@mantine/core";
import { useCurrentUser } from "src/global-states/atoms";
import { BellIcon } from "../ui-libraries/icon/BellIcon";
import { SettingModal } from "../feature/SettingModal";
import { LINKS } from "../utils/constants/link";

export const NavItem: FC = memo(() => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [settingOpened, setSettingOpened] = useState(false);

  if (!currentUser) return null;

  const handleSettingModal = () => {
    setSettingOpened(!settingOpened);
  };

  return (
    <div className="flex gap-5 items-center">
      <button className="hover:text-gray-700 bg-white">
        <BellIcon />
      </button>
      <button onClick={handleSettingModal} className="rounded-full hover:opacity-90">
        {currentUser.photoURL ? (
          <Avatar
            radius="xl"
            size={40}
            className="hover:opacity-80"
            src={currentUser.photoURL}
            alt={currentUser.displayName ? currentUser.displayName : "ゲスト"}
          />
        ) : (
          <Avatar src={null} radius="xl" size={40} className="hover:opacity-80" alt="ゲスト" />
        )}
      </button>
      <SettingModal
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        opened={settingOpened}
        setOpened={handleSettingModal}
      />
    </div>
  );
});
NavItem.displayName = "NavItem";

export const Header: FC = memo(() => {
  return (
    <header className="flex sticky top-0 z-10 justify-between items-center py-3 px-4 h-12 border-b">
      <Link href={LINKS.HOME}>
        <Image src={"/favicons/favicon-32x32.png"} width={32} height={32} alt="Tech.Uniアイコン" />
      </Link>
      <NavItem />
    </header>
  );
});
Header.displayName = "Header";

// 通知・ユーザーアイコンをクリックした時に、モーダル表示する
