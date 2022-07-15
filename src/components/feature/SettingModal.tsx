import { FC, useState } from "react";
import { Modal as MantineModal, Select } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { useRecoilState } from "recoil";
import { At } from "tabler-icons-react";
import { doc, setDoc } from "firebase/firestore";
import { currentUserState } from "src/global-states/atoms";
import { db } from "../utils/libs/firebase";
import { AppButton } from "../ui-libraries/AppButton";
import { facultyData, gradeData } from "../utils/constants/university";
import { AppInput } from "../ui-libraries/Input";
import { ImageUpload } from "./ImageUpload";

type Props = {
  opened: boolean;
  setOpened: () => void;
};

export const SettingModal: FC<Props> = ({ opened, setOpened }) => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const [file, setFile] = useState<File | null>(null);
  const [displayName, setDisplayName] = useState<string | undefined>(currentUser?.displayName);
  const [email, setEmail] = useState<string | undefined>(currentUser?.email);
  const [university, setUniversity] = useState<string | undefined>(currentUser?.university);
  const [grade, setGrade] = useState<string | null | undefined>(currentUser?.grade);
  const [faculty, setFaculty] = useState<string | null | undefined>(currentUser?.faculty);
  const [github, setGithub] = useState<string | undefined>(currentUser?.github);
  const [twitter, setTwitter] = useState<string | undefined>(currentUser?.twitter);
  const [instagram, setInstagram] = useState<string | undefined>(currentUser?.instagram);

  if (!currentUser) return null;
  const userRef = doc(db, "users", currentUser.uid);

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
    });
    await setDoc(userRef, currentUser);
    setOpened();
  };

  return (
    <MantineModal opened={opened} onClose={setOpened} title="設定">
      <ImageUpload currentUser={currentUser} setFile={setFile} file={file} />
      <AppInput
        required
        label="名前"
        placeholder="名前"
        value={displayName}
        onChange={(e) => setDisplayName(e.currentTarget.value)}
      />
      <TextInput
        required
        label="メールアドレス"
        variant="filled"
        placeholder="techuni@code.com"
        value={email ? email : ""}
        onChange={(e) => setEmail(e.currentTarget.value)}
        className="mt-4"
      />
      <TextInput
        label="大学"
        variant="filled"
        placeholder="tech大学"
        className="mt-2"
        value={university}
        onChange={(e) => setUniversity(e.currentTarget.value)}
      />
      <Select
        variant="filled"
        label="学部"
        placeholder="code学部"
        data={gradeData}
        className="mt-4"
        value={grade}
        dropdownComponent="div"
        onChange={setGrade}
      />
      <Select
        variant="filled"
        label="学部"
        placeholder="code学部"
        data={facultyData}
        className="mt-4"
        value={faculty}
        dropdownComponent="div"
        onChange={setFaculty}
      />
      <AppInput
        // todo: TwitterIconを追加
        required
        label="github"
        icon={<At size={18} />}
        placeholder="techuni"
        value={github}
        onChange={(e) => setGithub(e.currentTarget.value)}
      />
      <AppInput
        // todo: TwitterIconを追加
        required
        label="Twitter"
        icon={<At size={18} />}
        placeholder="techuni"
        value={twitter}
        onChange={(e) => setTwitter(e.currentTarget.value)}
      />
      <AppInput
        // todo: InstagramIconを追加
        required
        label="instagram"
        icon={<At size={18} />}
        placeholder="techuni"
        value={instagram}
        onChange={(e) => setInstagram(e.currentTarget.value)}
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
