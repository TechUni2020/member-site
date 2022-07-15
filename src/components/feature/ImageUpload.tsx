import { Group, Avatar } from "@mantine/core";
import React, { FC, memo } from "react";
import { CurrentUser } from "src/global-states/atoms";

type Props = {
  file: File | null;
  setFile: (img: File | null) => void;
  currentUser: CurrentUser | null;
};

export const ImageUpload: FC<Props> = memo(({ file, setFile, currentUser }) => {
  if (currentUser === null) {
    return null;
  }
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Group>
      <Avatar
        radius="xl"
        size={40}
        src={currentUser?.photoURL}
        alt={currentUser?.displayName ? currentUser.displayName : "ゲスト"}
      />
      <p className="font-bold">→</p>
      {file && <Avatar src={window.URL.createObjectURL(file)} radius="xl" size={40} />}
      <label htmlFor="settingImg" className="p-2 rounded-md border-2  border-dashed hover:cursor-pointer">
        <p className="text-gray-400 hover:text-gray-500">ファイルを選ぶ</p>
        <input type="file" accept="image/png" className="hidden" onChange={handleOnChange} id="settingImg" />
      </label>
    </Group>
  );
});
ImageUpload.displayName = "ImageUpload";
