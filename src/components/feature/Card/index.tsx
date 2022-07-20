/* eslint-disable @next/next/no-img-element */
import { FC, memo } from "react";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { GitHubIcon } from "src/components/ui-libraries/icon/GitHubIcon";
import { CurrentUser, currentUserState } from "src/global-states/atoms";
import { InstagramIcon } from "src/components/ui-libraries/icon/InstagramIcon";
import { TwitterIcon } from "src/components/ui-libraries/icon/TwitterIcon";

const UniAndBio = () => {
  // const arrays = [
  //   ["uni", "同志社"],
  //   ["faculty", "経済"],
  //   ["grade", "学部2"],
  // ];
  return (
    <div className="py-1 px-2  text-left rounded-lg">
      <div className="flex">
        {/* mapで回してほしい */}
        <div>
          <p className="font-bold text-gray-400">uni</p>
          <p>同志社</p>
        </div>
        <div className="px-2">
          <p className="font-bold text-gray-400">faculty</p>
          <p>経済</p>
        </div>
        <div className="px-2">
          <p className="font-bold text-gray-400">grade</p>
          <span>学部2</span>
        </div>
      </div>

      <div className="border-t-2">
        <p className="font-bold text-gray-400">自己紹介</p>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">はじめまして！よろしくお願いします！！</p>
      </div>
    </div>
  );
};

const Interest = () => {
  return (
    <div>
      <div className="py-1 px-2 w-36 font-bold text-center text-white  whitespace-nowrap bg-yellow-500 rounded-full">
        <p>フロントエンド</p>
      </div>
      <div className="flex items-center">
        {/*技術・ 3つごとに並べる→9個までしか入力させないようにする */}
        <div className="mx-1 w-2 h-2 bg-gray-500 rounded-full" />
        <p className="p-1">Next.js</p>
        <div className="mx-1 w-2 h-2 bg-blue-500 rounded-full" />
        <p className="p-1">React</p>
        <div className="mx-1 w-2 h-2 bg-red-500 rounded-full" />
        <p className="p-1">GraphQL</p>
      </div>
    </div>
  );
};

const LinkComponent = () => {
  return (
    <div className="flex justify-between px-2 w-[120px]">
      <Link href={`https://github.com/ `}>
        <a>
          <GitHubIcon />
        </a>
      </Link>
      <Link href={`https://github.com/ `}>
        <a>
          <TwitterIcon />
        </a>
      </Link>
      <Link href={`https://github.com/ `}>
        <a>
          <InstagramIcon />
        </a>
      </Link>
    </div>
  );
};

const Ribbon = () => {
  return (
    <>
      <div className="first-letter: inline-block absolute top-1 left-0  py-1 px-3 m-0 h-[30px] text-base font-semibold  text-white bg-red-500 shadow">
        副代表
      </div>
    </>
  );
};

type MemberCardProps = Omit<CurrentUser, "uid" | "createdAt" | "email">;

export const MemberCard: FC<MemberCardProps> = memo(() => {
  const currentUser = useRecoilValue(currentUserState);
  return (
    <div className="relative py-6 px-4  w-[36em] bg-white hover:bg-gray-50 rounded-md shadow-md">
      <div className="grid grid-cols-5 grid-flow-row">
        <div className="col-span-1">
          <Ribbon />
          <div className="w-24 text-center">
            <div className="flex justify-center items-center p-1 bg-gradient-to-r from-pink-200 via-yellow-200 to-green-200 rounded-full">
              <img src={currentUser?.photoURL} alt="山本新の画像" className="rounded-full" />
            </div>
            <p className="pt-1 text-lg font-bold">山本 新</p>
            {/* //todo あだ名の部分はmodalで出す  {/* <p className="px-2 text-sm font-light text-gray-700">しんくん</p> */}
          </div>
        </div>

        <div className="flex flex-col col-span-4 px-2">
          <Interest />
          <UniAndBio />
          <div className="flex flex-col justify-end items-end mt-auto">
            <LinkComponent />
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
});
MemberCard.displayName = "MemberCard";

// todo: 左側と右側をgridでやる方がいいかもしれない。それで幅を指定する？
