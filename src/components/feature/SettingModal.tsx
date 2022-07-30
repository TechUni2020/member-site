import { FC, useState } from "react";
import { Avatar, Group, Modal as MantineModal, MultiSelect, Select, Tabs, TextInput, Text } from "@mantine/core";
import { successToast } from "../ui-libraries/AppToast";
import { auth } from "../utils/libs/firebase";
import { doc, DocumentReference, updateDoc } from "firebase/firestore";
import { CurrentUser, useCurrentUser } from "src/global-states/atoms";
import { db } from "../utils/libs/firebase";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { facultyData, fieldDetailsData, gradeData, interestData } from "../utils/constants/university";
import {
  GitHubIcon,
  InfoIcon,
  InstagramIcon,
  LogoutIcon,
  SettingIcon,
  TwitterIcon,
  DeleteIcon,
} from "../ui-libraries/icon";
import { AppButton } from "../ui-libraries/AppButton";
import { LINKS } from "../utils/constants/link";

type Props = {
  opened: boolean;
  setOpened: () => void;
};

type FormData = Omit<CurrentUser, "uid" | "createdAt" | "id">;

export const SettingModal: FC<Props> = ({ opened, setOpened }) => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    active: currentUser?.active,
    bio: currentUser?.bio,
    displayName: currentUser?.displayName,
    email: currentUser?.email,
    faculty: currentUser?.faculty,
    field: currentUser?.field,
    fieldDetails: currentUser?.fieldDetails,
    github: currentUser?.github,
    grade: currentUser?.grade,
    instagram: currentUser?.instagram,
    photoURL: currentUser?.photoURL as string,
    position: currentUser?.position as number,
    status: currentUser?.status as number,
    twitter: currentUser?.twitter,
    university: currentUser?.university,
  });

  const {
    active,
    bio,
    displayName,
    email,
    faculty,
    field,
    fieldDetails,
    github,
    grade,
    instagram,
    photoURL,
    position,
    status,
    twitter,
    university,
  } = formData;

  if (!currentUser) return null;

  const userRef = doc(db, "users", currentUser.uid) as DocumentReference<CurrentUser>;

  const handleSave = async () => {
    setCurrentUser({
      ...currentUser,
      active: active,
      bio: bio,
      displayName: displayName,
      email: email,
      faculty: faculty,
      field: field,
      fieldDetails: fieldDetails,
      github: github,
      grade: grade,
      instagram: instagram,
      photoURL: photoURL,
      position: position,
      status: status,
      twitter: twitter,
      university: university,
    });
    await updateDoc(userRef, formData);
    setFile(null);
    setOpened();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFormData({ ...formData, photoURL: URL.createObjectURL(e.target.files[0]) });
      setFile(e.target.files[0]);
    }
  };

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
    <MantineModal
      opened={opened}
      onClose={setOpened}
      title="設定"
      size="xl"
      overlayOpacity={0.55}
      overlayBlur={3}
      overflow="inside"
      radius={10}
    >
      <Tabs defaultValue="アカウント">
        <Tabs.List>
          <Tabs.Tab value="アカウント" icon={<InfoIcon />}>
            アカウント
          </Tabs.Tab>
          <Tabs.Tab value="その他" icon={<SettingIcon />}>
            その他
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="アカウント">
          <Group className="pt-4">
            <Avatar
              radius="xl"
              size={40}
              src={currentUser.photoURL}
              alt={currentUser.displayName ? currentUser.displayName : "ゲスト"}
            />
            <p className="font-bold">→</p>
            {file && <Avatar src={window.URL.createObjectURL(file) ?? currentUser.photoURL} radius="xl" size={40} />}
            <label htmlFor="settingImg" className="p-2 rounded-md border-2  border-dashed hover:cursor-pointer">
              <p className="text-gray-400 hover:text-gray-500">ファイルを選ぶ</p>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                onChange={handleOnChange}
                id="settingImg"
              />
            </label>
          </Group>
          <TextInput
            required
            label="名前"
            placeholder="名前"
            value={displayName}
            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
          />
          <TextInput
            required
            label="メールアドレス"
            placeholder="techuni@code.com"
            value={email ? email : ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-4"
          />
          <Group className="flex justify-between">
            <TextInput
              label="大学"
              placeholder="tech大学"
              className="mt-4"
              value={university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
            />
            <Select
              label="学年"
              placeholder="code学年"
              data={gradeData}
              className="mt-4"
              value={grade}
              dropdownComponent="div"
              onChange={(e) => setFormData({ ...formData, grade: e })}
            />
            <Select
              label="学部"
              placeholder="code学部"
              data={facultyData}
              className="mt-4"
              value={faculty}
              dropdownComponent="div"
              onChange={(e) => setFormData({ ...formData, faculty: e })}
            />
          </Group>

          <Group className="flex justify-between">
            <TextInput
              required
              label="github"
              icon={<GitHubIcon />}
              placeholder="techuni"
              value={github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              className="mt-4"
            />
            <TextInput
              required
              label="twitter"
              icon={<TwitterIcon />}
              placeholder="techuni"
              value={twitter}
              onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
              className="mt-4"
            />
            <TextInput
              required
              label="instagram"
              icon={<InstagramIcon />}
              placeholder="techuni"
              value={instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              className="mt-4"
            />
          </Group>

          <Select
            required
            label="最も興味のある分野"
            placeholder="code学年"
            data={interestData}
            className="mt-4"
            value={field}
            dropdownComponent="div"
            onChange={(e) => setFormData({ ...formData, field: e })}
          />
          <MultiSelect
            label="よく使用するフレームワーク・ライブラリー"
            placeholder="Next.js"
            searchable
            nothingFound="見つかりませんでした。"
            data={fieldDetailsData}
            className="mt-4"
            value={fieldDetails}
            dropdownComponent="div"
            maxSelectedValues={3}
            onChange={(e) => setFormData({ ...formData, fieldDetails: e })}
          />
          <TextInput
            label="一言"
            placeholder="はじめまして！"
            value={bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="mt-4"
          />
          <div className="mt-5 w-full text-center">
            <AppButton
              type="button"
              color="blue"
              size="md"
              radius="md"
              variant="filled"
              className=""
              onClick={handleSave}
            >
              保存
            </AppButton>
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="その他">
          <Text weight="bold">メール通知</Text>
          <Text weight="bold">
            <Text weight="bold">テーマカラー</Text>
          </Text>
          <div>
            <Text weight="bold">個人アカウントの管理</Text>
            <AppButton
              type="button"
              color="red"
              size="xs"
              radius="md"
              variant="subtle"
              onClick={handleLogout}
              className="mx-auto mb-5 my-2"
            >
              <LogoutIcon />
              ログアウト
            </AppButton>
            <AppButton type="button" color="red" size="xs" radius="md" variant="subtle" className="mx-auto mb-5">
              <DeleteIcon />
              アカウントの削除
            </AppButton>
          </div>
        </Tabs.Panel>
      </Tabs>
    </MantineModal>
  );
};

// todo: 最も興味のある分野を選んだら、fieldDetailsが連動するようにする
