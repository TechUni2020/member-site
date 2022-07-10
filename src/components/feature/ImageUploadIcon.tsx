import { Group, Avatar } from "@mantine/core";
import React, { FC, memo, useState } from "react";
import { useRecoilState } from "recoil";
import { User } from "firebase/auth";
import { currentUserState } from "src/global-states/atoms";

type ImageInputProps = {
  setFile: (img: File | null) => void;
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
};

const ImageInput: FC<ImageInputProps> = ({ setFile, currentUser, setCurrentUser }) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFile(e.target.files[0]);
      //   setCurrentUser({ ...currentUser, photoURL: URL.createObjectURL(e.target.files[0]) });
    }
  };
  return (
    <label htmlFor="settingImg" className="p-2 rounded-md border-2  border-dashed hover:cursor-pointer">
      <p className="text-gray-400 hover:text-gray-500">ファイルを選ぶ</p>
      <input type="file" accept="image/png" className="hidden" onChange={handleOnChange} id="settingImg" />
    </label>
  );
};

export const ImageUploadIcon: FC = memo(() => {
  const [file, setFile] = useState<File | null>(null);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  return (
    <Group>
      <Avatar
        radius="xl"
        size={40}
        src={currentUser?.photoURL}
        alt={currentUser?.displayName ? currentUser.displayName : "ゲスト"}
      />
      <p className="font-bold">→</p>
      {file ? <Avatar src={window.URL.createObjectURL(file)} radius="xl" size={40} /> : null}
      <ImageInput setFile={setFile} currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </Group>
  );
});
ImageUploadIcon.displayName = "ImageUploadIcon";
