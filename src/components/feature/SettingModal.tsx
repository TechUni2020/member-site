import { FC, useState } from "react";
import { Avatar, Group, Modal as MantineModal, Select, Tabs, TextInput } from "@mantine/core";
import { doc, DocumentReference, updateDoc } from "firebase/firestore";
import { CurrentUser } from "src/global-states/atoms";
import { useUploadProfileIcon } from "src/hooks/useUploadProfileIcon";
import { db } from "../utils/libs/firebase";
import { AppButton } from "../ui-libraries/AppButton";
import { facultyData, gradeData } from "../utils/constants/university";
import { GitHubIcon, InfoIcon, InstagramIcon, SettingIcon, TwitterIcon } from "../ui-libraries/icon";

type Props = {
  currentUser: CurrentUser;
  setCurrentUser: (currentUser: CurrentUser) => void;
  opened: boolean;
  setOpened: () => void;
};

export type FormData = Omit<CurrentUser, "uid" | "createdAt" | "id">;

export const SettingModal: FC<Props> = ({ currentUser, setCurrentUser, opened, setOpened }) => {
  const [formData, setFormData] = useState<FormData>({
    bio: currentUser.bio,
    displayName: currentUser.displayName,
    email: currentUser.email,
    faculty: currentUser.faculty,
    field: currentUser.field,
    github: currentUser.github,
    grade: currentUser.grade,
    instagram: currentUser.instagram,
    photoURL: currentUser.photoURL,
    position: currentUser.position,
    status: currentUser.status,
    twitter: currentUser.twitter,
    university: currentUser.university,
  });
  const { file, setFile, percent, handleOnChange } = useUploadProfileIcon({ formData, setFormData });

  const {
    bio,
    displayName,
    email,
    faculty,
    field,
    github,
    grade,
    instagram,
    photoURL,
    position,
    status,
    twitter,
    university,
  } = formData;

  const userRef = doc(db, "users", currentUser.uid) as DocumentReference<CurrentUser>;

  const handleSave = async () => {
    setCurrentUser({
      ...currentUser,
      bio: bio,
      displayName: displayName,
      email: email,
      faculty: faculty,
      field: field,
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

  const uploadImage = () => {
    if (percent === null) return;
    if (percent !== 100) return <p className="px-2 font-bold text-blue-300 bg-slate-100 rounded-full">{percent}%</p>;
    return file && <Avatar src={window.URL.createObjectURL(file) ?? currentUser.photoURL} radius="xl" size={40} />;
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
            {uploadImage()}
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
            variant="filled"
            placeholder="名前"
            value={displayName}
            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
          />
          <TextInput
            required
            label="メールアドレス"
            variant="filled"
            placeholder="techuni@code.com"
            value={email ? email : ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-4"
          />
          <Group className="flex justify-between">
            <TextInput
              label="大学"
              variant="filled"
              placeholder="tech大学"
              className="mt-4"
              value={university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
            />
            <Select
              variant="filled"
              label="学年"
              placeholder="code学年"
              data={gradeData}
              className="mt-4"
              value={grade}
              dropdownComponent="div"
              onChange={(e) => setFormData({ ...formData, grade: e })}
            />
            <Select
              variant="filled"
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
              variant="filled"
              label="github"
              icon={<GitHubIcon />}
              placeholder="techuni"
              value={github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              className="mt-4"
            />
            <TextInput
              required
              variant="filled"
              label="twitter"
              icon={<TwitterIcon />}
              placeholder="techuni"
              value={twitter}
              onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
              className="mt-4"
            />
            <TextInput
              required
              variant="filled"
              label="instagram"
              icon={<InstagramIcon />}
              placeholder="techuni"
              value={instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              className="mt-4"
            />
          </Group>
          <TextInput
            variant="filled"
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
          <h1>メール通知</h1>
          <h1>テーマカラー</h1>
          <h1>個人アカウントの管理</h1>
        </Tabs.Panel>
      </Tabs>
    </MantineModal>
  );
};

// todo: AppInputを使う
