import { FC, useState } from "react";
import { Avatar, Group, Modal as MantineModal, Select } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { useRecoilState } from "recoil";
import { At } from "tabler-icons-react";
import { doc, DocumentReference, updateDoc } from "firebase/firestore";
import { CurrentUser, currentUserState } from "src/global-states/atoms";
import { db } from "../utils/libs/firebase";
import { AppButton } from "../ui-libraries/AppButton";
import { facultyData, gradeData } from "../utils/constants/university";
import { AppInput } from "../ui-libraries/Input";

type Props = {
  opened: boolean;
  setOpened: () => void;
};

type FormData = Omit<CurrentUser, "uid" | "createdAt" | "id" | "bio">;

export const SettingModal: FC<Props> = ({ opened, setOpened }) => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    displayName: currentUser?.displayName,
    email: currentUser?.email,
    university: currentUser?.university,
    grade: currentUser?.grade,
    faculty: currentUser?.faculty,
    github: currentUser?.github,
    twitter: currentUser?.twitter,
    instagram: currentUser?.instagram,
    photoURL: currentUser?.photoURL as string,
  });

  const { displayName, email, university, grade, faculty, github, twitter, instagram, photoURL } = formData;

  if (!currentUser) return null;

  const userRef = doc(db, "users", currentUser.uid) as DocumentReference<CurrentUser>;

  const handleSave = async () => {
    setCurrentUser({
      ...currentUser,
      displayName: displayName,
      email: email,
      university: university,
      grade: grade,
      faculty: faculty,
      github: github,
      twitter: twitter,
      instagram: instagram,
      photoURL: photoURL,
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

  return (
    <MantineModal opened={opened} onClose={setOpened} title="設定">
      <Group>
        <Avatar
          radius="xl"
          size={40}
          src={currentUser?.photoURL}
          alt={currentUser?.displayName ? currentUser.displayName : "ゲスト"}
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
      <AppInput
        required
        label="名前"
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
      <TextInput
        label="大学"
        variant="filled"
        placeholder="tech大学"
        className="mt-2"
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
      <AppInput
        // todo: TwitterIconを追加
        required
        label="github"
        icon={<At size={18} />}
        placeholder="techuni"
        value={github}
        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
      />
      <AppInput
        // todo: TwitterIconを追加
        required
        label="Twitter"
        icon={<At size={18} />}
        placeholder="techuni"
        value={twitter}
        onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
      />
      <AppInput
        // todo: InstagramIconを追加
        required
        label="instagram"
        icon={<At size={18} />}
        placeholder="techuni"
        value={instagram}
        onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
      />
      <div className="mt-5 w-full text-center">
        <AppButton type="button" color="blue" size="md" radius="md" variant="filled" className="" onClick={handleSave}>
          保存
        </AppButton>
      </div>
    </MantineModal>
  );
};

// todo: AppInputを使う
